import { Avatar } from "../../avatar";

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