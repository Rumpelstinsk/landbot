import { ChatNewMessageForm } from './ChatNewMessageForm';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './message-list';

export const Chat = () => {
  return (
    <>
      <ChatHeader />
      <ChatMessageList />
      <ChatNewMessageForm />
    </>
  );
}
