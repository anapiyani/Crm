import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import classes from "./style.module.scss";
import { Button, Divider, SxProps, TextField } from "@mui/material";
import { ArrowBack, Send, DragHandle } from "@mui/icons-material";
import Icons from "@/assets/icons/icons";
import classNames from "classnames";
import { useTextToBot } from "@/service/bot/bot.hook";

type TMessages = {
  sender: "user" | "bot";
  text: string;
};

const ChatModal = ({
  closeMenuChat,
  open,
}: {
  closeMenuChat: () => void;
  open: boolean;
}) => {
  const mutation = useTextToBot();
  const [chatMenuWidth, setChatMenuWidth] = useState<number>(470);
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<TMessages[]>([]);
  const [loadingMessageId, setLoadingMessageId] = useState<number | null>(null);

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

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (userMessage.trim() === "") return;
    const newMessages: TMessages[] = [
      ...messages,
      { sender: "user", text: userMessage },
    ];
    setMessages(newMessages);

    const loadingIndex = newMessages.length;
    const loadingMessages: TMessages[] = [
      ...newMessages,
      { sender: "bot", text: "Ассистент печатает..." },
    ];
    setMessages(loadingMessages);
    setLoadingMessageId(loadingIndex);

    try {
      const response = await mutation.mutateAsync({ query: userMessage });
      const historyMessages: TMessages[] = response.history.flatMap((entry) => [
        {
          sender: "user" as "user" | "bot",
          text: entry.user_query,
        },
        {
          sender: "bot" as "user" | "bot",
          text: entry.bot_response,
        },
      ]);

      const botText =
        response?.response
          .map(
            (answer) =>
              `${response?.human_readable_text} ${answer.date} ${answer.start_time} - ${answer.end_time}: ${answer.services}`
          )
          .join("\n") || `${response?.human_readable_text}`;

      const updatedMessages: TMessages[] = [
        ...historyMessages,
        ...messages,
        { sender: "user", text: userMessage },
        { sender: "bot", text: botText },
      ];

      setMessages(updatedMessages);
    } catch (error) {
      setMessages((prevMessages) => {
        console.log(error);
        const updatedMessages = [...prevMessages];
        if (loadingIndex !== null) {
          if (
            error instanceof Error &&
            (error as any).response?.data?.gpt_response
          ) {
            updatedMessages[loadingIndex] = {
              sender: "bot",
              text: (error as any).response.data.gpt_response,
            };
          } else {
            updatedMessages[loadingIndex] = {
              sender: "bot",
              text: "Что-то пошло не так.",
            };
          }
        }
        return updatedMessages;
      });
    }

    setUserMessage("");
    setLoadingMessageId(null);
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
          onSubmit={handleSendMessage}
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
