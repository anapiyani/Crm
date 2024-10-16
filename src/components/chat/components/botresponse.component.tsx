import MessageBox from "@/components/message-box/message-box.component";
import dayjs from "dayjs";
import classes from "../style.module.scss";
import { TBotAnswer, TBotResponse } from "@/ts/bot.types";

const renderBotResponse = (botResponse: TBotResponse) => {
  const sameDataResponse = botResponse.appointments?.reduce(
    (acc: Record<string, TBotAnswer[]>, answer: TBotAnswer) => {
      const key = `${answer.date}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(answer);
      return acc;
    },
    {} as Record<string, TBotAnswer[]>
  );

  return (
    <div>
      <div className={classes.bot_response_content}>
        <p>{botResponse.human_readable_text}</p>
      </div>
      {sameDataResponse &&
        Object.keys(sameDataResponse).map((key, index) => (
          <div className={classes.bot_response_answer} key={index}>
            <h3>{dayjs(key).format("DD.MM.YYYY")}:</h3>
            {sameDataResponse[key].map(
              (
                {
                  start_time,
                  end_time,
                  client_first_name,
                  client_last_name,
                  services,
                  employee_first_name,
                  employee_last_name,
                  status,
                  appointment_id,
                  client_phone_number,
                },
                index
              ) => (
                <MessageBox
                  key={index}
                  start_time={start_time}
                  end_time={end_time}
                  user_first_name={client_first_name}
                  user_last_name={client_last_name}
                  service={services}
                  employee_first_name={employee_first_name}
                  employee_last_name={employee_last_name}
                  status={status}
                  appointment_id={appointment_id || undefined}
                  client_phone_number={client_phone_number}
                />
              )
            )}
          </div>
        ))}
    </div>
  );
};

export default renderBotResponse;
