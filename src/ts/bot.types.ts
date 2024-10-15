import { ReactNode } from "react";

export type TBotResponse = {
  appointments: TBotAnswer[];
  history: TBotHistory[];
  human_readable_text: string;
  status: string;
  type: string;
};

export type TBotHistory = {
  user_query: string;
  bot_response: string;
  timestamp: string;
};

export type TBotAnswer = {
  appointment_id: number | null;
  attendance_percentage: number;
  client_phone_number: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  employee_first_name: string;
  employee_last_name: string;
  client_first_name: string;
  client_last_name: string;
  services: string;
};

export type TMessages = {
  sender: "user" | "bot";
  text: string | ReactNode;
};
