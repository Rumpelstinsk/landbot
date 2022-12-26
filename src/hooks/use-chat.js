import { useEffect, useMemo, useState } from "react";

/** Landbot client to work with the API */
var core = new window.Landbot.Core({
    firebase: window.firebase,
    configUrl: 'https://chats.landbot.io/u/H-441480-B0Q96FP58V53BJ2J/index.json',
});

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

/**
 * @callback SendMessage
 * @property {ChatMessage} message - Message to be sent
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
      sendMessage: (message) => core.sendMessage({ message })
    }), [])

/**
 * ChatMessageAPI
 * @typedef {Object} ChatMessageAPI
 * @property {String} key - Message identifier
 * @property {String} text - Content of the message
 * @property {String} author - User who wrote the message
 * @property {Date} timestamp - Time when the message was created
 * @property {String} type - Type of the message
 */
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
 * APIChatMessage
 * @typedef {Object} APIChatMessage
 * @property {String} samurai - For non existing values, it indicates it is a message from Landbot
 * @property {String} title - Title of the message
 * @property {String} text - Content of the message
 * @property {String} type - Type of the message
 * @property {String} key - Message identifier
 */

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