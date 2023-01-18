import React from 'react';
import { Message } from './../Message';

const messagesFilter = (data) => {
  /** Support for basic message types */
  return ['text', 'dialog'].includes(data.type);
};

export const Messages = ({ data }) => {
  return (
    <div id="landbot-messages-container" className="landbot-messages-container">
      {Object.values(data)
        .filter(messagesFilter)
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((message) => (
          <Message author={message.author}>{message.text}</Message>
        ))}
    </div>
  );
};
