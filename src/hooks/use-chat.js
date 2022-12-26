import { useEffect, useMemo, useState } from "react";

var core = new window.Landbot.Core({
    firebase: window.firebase,
    configUrl: 'https://chats.landbot.io/u/H-441480-B0Q96FP58V53BJ2J/index.json',
  });

  
export const useChat = () => {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        core.pipelines.$readableSequence.subscribe((data) => {
          setMessages((messages) => ({
            ...messages,
            [data.key]: parseMessage(data),
          }));
        });
    
        core.init().then((data) => {
          setMessages(parseMessages(data.messages));
        });
      }, []);

      return useMemo(() => 
        Object.values(messages)
            .filter(messagesFilter)
            .sort((a, b) => a.timestamp - b.timestamp),
        [messages])
}

export const useChatActions = () => useMemo(() => ({
      sendMessage: (message) => core.sendMessage({ message })
    }), [])

const messagesFilter = (data) => {
    /** Support for basic message types */
    return ['text', 'dialog'].includes(data.type);
  }

const parseMessages = (messages) => Object.values(messages).reduce((obj, next) => {
    obj[next.key] = parseMessage(next);
    return obj;
  }, {});

const parseMessage = (data) => ({
    key: data.key,
    text: data.title || data.message,
    author: data.samurai !== undefined ? 'bot' : 'user',
    timestamp: data.timestamp,
    type: data.type,
})