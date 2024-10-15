import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import classes from "./style.module.scss";
import { Button, Divider, SxProps, TextField } from "@mui/material";
import { ArrowBack, Send, DragHandle } from "@mui/icons-material";
import Icons from "@/assets/icons/icons";
import classNames from "classnames";
import { useTextToBot } from "@/service/bot/bot.hook";
import { TMessages } from "@/ts/bot.types";
import useHandleSendMessage from "./hooks/useSendMessage";

const FormInputStyles: SxProps = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    fontSize: "1.4rem",
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.5rem",
    padding: "0 1rem",
  },
};

const ChatModal = ({
  closeMenuChat,
  open,
}: {
  closeMenuChat: () => void;
  open: boolean;
}) => {
  const [chatMenuWidth, setChatMenuWidth] = useState<number>(570);
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<TMessages[]>([]);
  const [loadingMessageId, setLoadingMessageId] = useState<number | null>(null);
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mutation = useTextToBot();

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return;
    const newWidth = e.offsetX;
    if (newWidth >= 330 && newWidth <= 820) {
      setChatMenuWidth(newWidth);
    }
  }, []);

  const stopResizing = useCallback(() => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  }, [handleMouseMove]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = useHandleSendMessage(
    setMessages,
    setUserMessage,
    setLoadingMessageId,
    userMessage,
    messages
  );

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    handleSendMessage(event);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [handleMouseMove, stopResizing]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      ref={chatMenuRef}
      className={classNames(
        classes["chat-menu"],
        open ? classes["show_side_bar"] : classes["close_side_bar"]
      )}
      style={{ width: `${chatMenuWidth}px` }}
    >
      <div className={classes["chat-menu-content"]}>
        <div className={classes["chat-menu-content__header"]}>
          <Button onClick={closeMenuChat} startIcon={<ArrowBack />}>
            Закрыть
          </Button>
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
        <form
          onSubmit={onSubmitForm}
          className={classes["chat-menu-content__form"]}
        >
          <TextField
            size="small"
            placeholder="Введите ваш запрос"
            autoComplete="off"
            sx={FormInputStyles}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            disabled={loadingMessageId !== null}
          />
          <Button
            disabled={loadingMessageId !== null}
            type="submit"
            variant="contained"
          >
            <Send />
          </Button>
        </form>
      </div>
      <div className={classes["chat-menu-resizer"]} onMouseDown={startResizing}>
        <DragHandle />
      </div>
    </div>
  );
};

export default ChatModal;
