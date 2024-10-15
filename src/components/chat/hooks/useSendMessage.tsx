import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import { useTextToBot } from "@/service/bot/bot.hook";
import { TMessages, TBotResponse, TBotAnswer } from "@/ts/bot.types";
import { AxiosError } from "axios";
import renderBotResponse from "../components/botresponse.component";

const useHandleSendMessage = (
  setMessages: Dispatch<SetStateAction<TMessages[]>>,
  setUserMessage: Dispatch<SetStateAction<string>>,
  setLoadingMessageId: Dispatch<SetStateAction<number | null>>,
  userMessage: string,
  messages: TMessages[]
) => {
  const mutation = useTextToBot();

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
      const response = (await mutation.mutateAsync({
        query: userMessage,
      })) as TBotResponse;
      const historyMessages: TMessages[] = response.history.flatMap(
        (entry: { user_query: string; bot_response: string }) => [
          {
            sender: "user",
            text: entry.user_query,
          },
          {
            sender: "bot",
            text: entry.bot_response,
          },
        ]
      );

      const botText: ReactNode = renderBotResponse(response);

      const updatedMessages: TMessages[] = [
        ...historyMessages,
        ...messages,
        { sender: "user", text: userMessage },
        { sender: "bot", text: botText },
      ];

      setMessages(updatedMessages);
    } catch (errors: unknown) {
      const error = errors as AxiosError;
      setMessages((prevMessages) => {
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
              text: "Что-то пошло не так",
            };
          }
        }
        return updatedMessages;
      });
    }

    setUserMessage("");
    setLoadingMessageId(null);
  };

  return handleSendMessage;
};

export default useHandleSendMessage;
