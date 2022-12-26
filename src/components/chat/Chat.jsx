import { ChatNewMessageForm } from './ChatNewMessageForm';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './message-list';

/**
 * Chat: Container for displaying user messages section. 
 * It includes the message list and a form to create a new message.
 * @component
 * @returns {JSX.Element}
 */
export const Chat = () => {
  return (
    <>
      <ChatHeader />
      <ChatMessageList />
      <ChatNewMessageForm />
    </>
  );
}
