import { useState } from "react";
import { useChatActions } from "../../hooks";

export const ChatNewMessageForm = () => {
    const [input, setInput] = useState('');
    const { sendMessage } = useChatActions()

    const handleSubmit = () => {
        if(!input) return;

        sendMessage(input)
        setInput('')
    }

    return (
        <div className="landbot-input-container">
          <div className="field">
            <div className="control">
              <input
                className="landbot-input"
                type="text"
                placeholder="Type here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button
                className="button landbot-input-send"
                onClick={handleSubmit}
                disabled={!input}
              >
                <span className="icon is-large">
                  <i className="fas fa-paper-plane fa-lg"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
    )
}