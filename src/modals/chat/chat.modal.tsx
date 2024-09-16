import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./style.module.scss";
import CustomTextField from "@/components/textField/textField.component";
import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  modalClasses,
} from "@mui/material"; // Added CircularProgress for loading spinner
import { Send } from "@mui/icons-material";
import { useState, FormEvent, useRef, useEffect } from "react";
import { useTextToBot } from "@/service/bot/bot.hook";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatModal = () => {
  const mutation = useTextToBot();
  const modal = useModal();
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Привет! Чем могу помочь?" },
  ]);
  const [loadingMessageId, setLoadingMessageId] = useState<number | null>(null);

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (userMessage.trim() === "") return;
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: userMessage },
    ];
    setMessages(newMessages);

    const loadingIndex = newMessages.length;
    const loadingMessages: Message[] = [
      ...newMessages,
      { sender: "bot", text: "Бот печатает..." },
    ];
    setMessages(loadingMessages);
    setLoadingMessageId(loadingIndex);

    try {
      const response = await mutation.mutateAsync({ query: userMessage });
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[loadingIndex] = {
          sender: "bot",
          text: response?.response || "Ошибка получения ответа",
        };
        return updatedMessages;
      });
    } catch (error) {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[loadingIndex] = {
          sender: "bot",
          text: "Что-то пошло не так",
        };
        return updatedMessages;
      });
    }

    setUserMessage("");
    setLoadingMessageId(null);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={modal.visible}
      onClick={() => {
        modal.hide();
      }}
    >
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.modal__window}>
          <div className={classes.modal__window__header}>
            <h2 className={classes.modal__window__title}>Чат с ботом</h2>
          </div>
          <Divider />
          <div className={classes.modal__window__content}>
            <div className={classes.chat}>
              <div className={classes.chat__content}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    ref={messagesEndRef}
                    className={
                      message.sender === "bot" ? classes.bot : classes.user
                    }
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <form className={classes.chat__form} onSubmit={handleSendMessage}>
                <CustomTextField
                  placeholder="Сообщение..."
                  label={""}
                  size="small"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  disabled={loadingMessageId !== null}
                  autoComplete="off"
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loadingMessageId !== null}
                >
                  {loadingMessageId !== null ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Send />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default NiceModal.create(ChatModal);
