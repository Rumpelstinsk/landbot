/** Landbot client to work with the API */
var core = new window.Landbot.Core({
    firebase: window.firebase,
    configUrl: 'https://chats.landbot.io/u/H-441480-B0Q96FP58V53BJ2J/index.json',
});

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
 * @callback HandleNewMessagesFunc
 * @property {ChatMessageAPI[]} messages
 * @returns {void}
 */
/**
 * onInit: This method defines the callback to be triggered after the client it's ready to be consumed
 * @param {HandleNewMessagesFunc} callback 
 * @returns {void}
 */
const onInit = (callback) => core.init().then(callback);

/**
 * onNewMessages: This method defines the callback to be triggered after new messages are received
 * @param {HandleNewMessagesFunc} callback 
 * @returns {void}
 */
const onNewMessages = (callback) => core.pipelines.$readableSequence.subscribe(callback);

/**
 * sendMessage: It creates a new message
 * @param {String} message 
 * @returns {void}
 */
const sendMessage = (message) => core.sendMessage({ message });

export const LandbotClient = {
    onInit,
    onNewMessages,
    sendMessage
}
