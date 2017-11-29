
export const handleMessageAction = (msgData) => {
  return {
    type: 'NEW_MESSAGE',
    newMessage: msgData
  }
};
