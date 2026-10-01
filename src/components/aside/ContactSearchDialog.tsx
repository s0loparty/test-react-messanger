import { useCheckWhatsappQuery } from '@/queryClient/queries/useCheckWhatsappQuery';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useNavigate } from '@tanstack/react-router';
import { useState, type ChangeEvent, type SubmitEventHandler } from 'react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContactSearchDialog({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [requestedPhone, setRequestedPhone] = useState('');
  const isValidPhone = /^\d{11,16}$/.test(inputValue.trim());
  const {
    data: contact,
    error,
    isFetching,
    refetch,
  } = useCheckWhatsappQuery({
    chatId: open ? requestedPhone : '',
  });

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.currentTarget.value);
    setRequestedPhone('');
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    if (!isValidPhone || isFetching) return;

    const phone = inputValue.trim();
    if (phone === requestedPhone) {
      void refetch();
    } else {
      setRequestedPhone(phone);
    }
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setInputValue('');
      setRequestedPhone('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent>
        <DialogHeader className="gap-0">
          <DialogTitle>Найти контакт и начать общаться</DialogTitle>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
            <Label htmlFor="contact-search">Номер телефона</Label>
            <Input
              id="contact-search"
              placeholder="Введите номер телефона"
              value={inputValue}
              onChange={handleInputChange}
            />
            <small className="text-xs text-muted-foreground">
              Введите номер телефона без пробелов и специальных символов,
              например: 79991234567
            </small>
            <Button type="submit" disabled={!isValidPhone || isFetching}>
              Проверить номер
            </Button>
            {inputValue && !isValidPhone && (
              <p className="text-sm text-destructive">
                Номер должен содержать от 11 до 16 цифр с кодом страны.
              </p>
            )}
            {isFetching && <p className="text-sm">Проверяем номер...</p>}
            {error && (
              <p className="text-sm text-destructive">
                Не удалось проверить номер. Попробуйте ещё раз.
              </p>
            )}
            {contact &&
              !isFetching &&
              !error &&
              (contact.existsWhatsapp && contact.chatId ? (
                <Button
                  type="button"
                  onClick={() => {
                    handleDialogOpenChange(false);
                    void navigate({
                      to: '/chat/$chatId',
                      params: { chatId: contact.phoneNumber },
                    });
                  }}
                >
                  Открыть чат
                </Button>
              ) : (
                <p className="text-sm text-destructive">
                  Аккаунт WhatsApp с таким номером не найден.
                </p>
              ))}
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
