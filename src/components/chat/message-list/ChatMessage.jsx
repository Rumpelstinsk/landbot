import { Avatar } from "../../avatar";

/**
 * Chat message
 * @typedef {Object} ChatMessage
 * @property {String} author - User who wrote the message
 * @property {String} text - Content of the message
 */

/**
 * ChatMessage: Component to display the content of a message
 * @component
 * @param {{ message: ChatMessage }} [Props]
 * @returns {JSX.Element}
 */
export const ChatMessage = ({message}) => (
    <article
        data-author={message.author}
        className="media landbot-message"
    >
        <Avatar />
        <div className="media-content landbot-message-content">
            <div className="content">
                <p>{message.text}</p>
            </div>
        </div>
    </article>
)