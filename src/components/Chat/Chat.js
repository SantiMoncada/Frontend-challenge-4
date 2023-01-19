import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Input } from './Input';
import { Messages } from './Messages';

const core = new window.Landbot.Core({
  firebase: window.firebase,
  configUrl: 'https://chats.landbot.io/u/H-441480-B0Q96FP58V53BJ2J/index.json',
});

const Chat = () => {
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

  useEffect(() => {
    const container = document.getElementById('landbot-messages-container');
    scrollBottom(container);
  }, [messages]);

  return (
    <>
      <Header>Landbot</Header>

      <Messages data={messages} />

      <Input send={(msg) => core.sendMessage(msg)} />
    </>
  );
};

function parseMessages(messages) {
  return Object.values(messages).reduce((obj, next) => {
    obj[next.key] = parseMessage(next);
    return obj;
  }, {});
}

function parseMessage(data) {
  return {
    key: data.key,
    text: data.title || data.message,
    author: data.samurai !== undefined ? 'bot' : 'user',
    timestamp: data.timestamp,
    type: data.type,
  };
}

function scrollBottom(container) {
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }
}

export default Chat;
