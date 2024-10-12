import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./style.module.scss";
import { Button, Divider } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Icons from "@/assets/icons/icons";

type TMessages = {
  sender: "user" | "bot";
  text: string;
};

const ChatModal = () => {
  const [chatMenuWidth, setChatMenuWidth] = useState<number>(420);
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<TMessages[]>([
    { sender: "bot", text: "Привет! Чем могу помочь?" },
    { sender: "user", text: "Привет, иди нахуй" },
  ]);
  const [loadingMessageId, setLoadingMessageId] = useState<number | null>(null);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return;
    const newWidth = e.offsetX;
    if (newWidth >= 300 && newWidth <= 800) {
      setChatMenuWidth(newWidth);
    }
  }, []);

  const stopResizing = useCallback(() => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  }, [handleMouseMove]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [handleMouseMove, stopResizing]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      ref={chatMenuRef}
      className={classes["chat-menu"]}
      style={{ width: `${chatMenuWidth}px` }}
    >
      <div className={classes["chat-menu-content"]}>
        <div className={classes["chat-menu-content__header"]}>
          <Button startIcon={<ArrowBack />}>Закрыть</Button>
          <h1>Чат-бот</h1>
          <p>Поддержка</p>
        </div>
        <Divider />
        <div className={classes["chat-menu-content__chat-contnet"]}>
          {messages.map((message, index) => (
            <div key={index} ref={messagesEndRef}>
              <div className={classes["messages-container"]}>
                {message.sender === "bot" && (
                  <img src={Icons["super-wise"]} alt="Super Wise Icon" />
                )}
                <div
                  className={
                    message.sender === "bot" ? classes.bot : classes.user
                  }
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={classes["chat-menu-resizer"]}
        onMouseDown={startResizing}
      />
    </div>
  );
};

export default ChatModal;
