import { EventContentArg } from "@fullcalendar/core";
import React from "react";
import classes from "../styles.module.scss";
import classNames from "classnames";
import dayjs from "dayjs";

interface IEventContentProps {
  eventInfo: EventContentArg;
}

const EventContent: React.FC<IEventContentProps> = ({ eventInfo }) => {
  const eventDuration = dayjs(eventInfo.event.end).diff(
    eventInfo.event.start,
    "minute"
  );

  return (
    <div
      className={classNames(classes["fullcalendar__event"], {
        [classes["fullcalendar__event--break"]]:
          eventInfo.event.extendedProps.type === "break",
        [classes[
          `fullcalendar__event--${eventInfo.event.extendedProps.status}`
        ]]: eventInfo.event.extendedProps.type === "appointment",
      })}
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: "100%",
      }}
    >
      <div
        className={classNames(
          classes["fullcalendar__event--header"],
          classes[
            `fullcalendar__event--${eventInfo.event.extendedProps.status}--header`
          ]
        )}
      >
        {eventInfo.timeText}
      </div>
      <div className={classes["fullcalendar__event--body"]}>
        {eventInfo.event.extendedProps.type === "break" ? (
          <div className={classes["u-ml-1"]}>
            <p>{eventInfo.event.extendedProps.break_note}</p>
          </div>
        ) : (
          <div className={classes["u-ml-1"]}>
            <p>{eventInfo.event.title}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventContent;
