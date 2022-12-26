import { useEffect, useMemo, useState } from "react";
import { LandbotClient } from "../wrappers";

/**
 * ChatMessage
 * @typedef {Object} ChatMessage
 * @property {String} key - Message identifier
 * @property {String} text - Content of the message
 * @property {String} author - User who wrote the message
 * @property {Date} timestamp - Time when the message was created
 * @property {String} type - Type of the message
 */

/**
 * useChat: Hook to retrieve the user messages
 * @function
 * @returns {ChatMessage[]}
 */
export const useChat = () => {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        LandbotClient.onNewMessages((data) => {
          setMessages((messages) => ({
            ...messages,
            [data.key]: parseMessage(data),
          }));
        });
    
        LandbotClient.onInit((data) => {
          setMessages(parseMessages(data.messages));
        });
      }, []);

      return useMemo(() => 
        Object.values(messages)
            .filter(messagesFilter)
            .sort((a, b) => a.timestamp - b.timestamp),
        [messages])
}

/**
 * @callback SendMessage
 * @property {String} message - Message to be sent
 * @returns {void}
 */
/**
 * @typedef UseChatActionsOutput
 * @property {SendMessage} sendMessage - Function to create new messages
 * @returns {void}
 */
/**
 * useChatActions: Hook to provide actions that can by performed on messages
 * @function
 * @returns {UseChatActionsOutput}
 */
export const useChatActions = () => useMemo(() => ({
      sendMessage: LandbotClient.sendMessage
    }), [])


/**
 * messagesFilter: Filters the messages to retrieve only the basic messages
 * @param {ChatMessage} message 
 * @returns {ChatMessage[]}
 */
const messagesFilter = (message) => {
    /** Support for basic message types */
    return ['text', 'dialog'].includes(message.type);
  }

/**
 * parseMessages: Normalizes a message list received from the API
 * @function
 * @param {APIChatMessage} messages 
 * @returns {ChatMessage[]}
 */
const parseMessages = (messages) => Object.values(messages).reduce((obj, next) => {
    obj[next.key] = parseMessage(next);
    return obj;
  }, {});

/**
 * parseMessage: Normalizes a single message retrieved from the API
 * @function
 * @param {APIChatMessage} message 
 * @returns {ChatMessage[
 */
const parseMessage = (message) => ({
    key: message.key,
    text: message.title || message.message,
    author: message.samurai !== undefined ? 'bot' : 'user',
    timestamp: message.timestamp,
    type: message.type,
})