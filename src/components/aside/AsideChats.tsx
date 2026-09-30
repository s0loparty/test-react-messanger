import { useChatsQuery } from '@/queryClient/queries/useChatsQuery';
import { AppErrorMessage } from '@/shared/components/AppErrorMessage';
import { AppLoaderContent } from '@/shared/components/AppLoaderContent';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { getInitials } from '@/shared/utils/getInitials';
import { Link } from '@tanstack/react-router';

export function AsideChats() {
  const { data: chats, error, isFetching } = useChatsQuery();
  return (
    <div className="z-10 flex min-h-0 w-80 flex-col outline-1">
      {isFetching && <AppLoaderContent />}
      {error?.message && <AppErrorMessage message={error.message} />}
      {chats && (
        <ScrollArea type="hover" className="min-h-0 flex-1">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              to="/chat/$chatId"
              params={{ chatId: chat.id }}
              className="block"
            >
              <div className="flex gap-2 p-2 hover:bg-blue-50">
                <Avatar className="size-12">
                  <AvatarImage />
                  <AvatarFallback>
                    {chat.name.length ? getInitials(chat.name) : '@'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center overflow-hidden text-sm">
                  <span className="block truncate font-semibold">
                    {chat.name.length ? chat.name : chat.id}
                  </span>
                  {/* <p className="mt-0.5 truncate text-gray-600">
                    последнее сообщение в чате
                  </p> */}
                </div>
              </div>
            </Link>
          ))}
        </ScrollArea>
      )}
    </div>
  );
}
