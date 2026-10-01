import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Bubble, BubbleContent } from '@/shared/components/ui/bubble';
import {
  Message,
  MessageAvatar,
  MessageContent,
} from '@/shared/components/ui/message';
import type { ChatMessage } from '@/shared/types/messages';
import type { Ref } from 'react';

type Props = {
  message: ChatMessage;
  messageRef?: Ref<HTMLDivElement>;
};

export function ChatMessageItem({ message, messageRef }: Props) {
  return (
    <Message
      ref={messageRef}
      align={message.type === 'incoming' ? 'start' : 'end'}
    >
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble
          className={
            message.type === 'incoming'
              ? '*:data-[slot=bubble-content]:bg-white *:data-[slot=bubble-content]:text-black'
              : ''
          }
        >
          <BubbleContent>{message.textMessage}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}
