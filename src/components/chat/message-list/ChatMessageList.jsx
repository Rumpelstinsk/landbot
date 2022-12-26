import { useEffect } from "react";
import { useChat } from "../../../hooks";

import { ChatMessage } from "./ChatMessage"

const MESSAGE_CONTAINER_ID = 'landbot-messages-container'

/**
 * ChatMessageList: Container for displaying user messages
 * @component
 * @returns {JSX.Element}
 */
export const ChatMessageList = () => {
  const messages = useChat()

  useEffect(() => {
    const container = document.getElementById(MESSAGE_CONTAINER_ID);
    scrollBottom(container);
  }, [messages]);

  return (
    <div
        id={MESSAGE_CONTAINER_ID}
        className="landbot-messages-container"
      >
        {messages.map((message) => (
            <ChatMessage key={message.key}  message={message}/>
          ))}
      </div>
)}

const scrollBottom = (container) => {
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }
}