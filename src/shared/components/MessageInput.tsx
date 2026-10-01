import { useEffect, useRef } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const MAX_HEIGHT = 160;

export function MessageInput({ value, onChange, disabled }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = '0px';

    const height = Math.min(el.scrollHeight, MAX_HEIGHT);

    el.style.height = `${height}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  };

  useEffect(resizeTextarea, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      disabled={disabled}
      rows={1}
      placeholder="Сообщение"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
          e.preventDefault();
          e.currentTarget.form?.requestSubmit();
        }
      }}
      className="max-h-40 min-h-12 flex-1 resize-none overflow-y-hidden bg-transparent px-3 py-2 text-sm leading-6 outline-none"
    />
  );
}
