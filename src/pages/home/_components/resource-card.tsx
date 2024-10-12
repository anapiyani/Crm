import React from "react";
import { ResourceApi } from "@fullcalendar/resource/index.js";
import classes from "../styles.module.scss";
import Icons from "@/assets/icons/icons";
import classNames from "classnames";
import { Avatar } from "@mui/material";

interface IResourceCardProps {
  arg: ResourceApi;
  handleResourceClick: (
    id: string,
    username: string,
    e: React.MouseEvent<HTMLElement>,
    scheduleId: string | null
  ) => void;
  viewMode: "daily" | "weekly" | "monthly";
}
const ResourceCard: React.FC<IResourceCardProps> = ({
  arg,
  handleResourceClick,
  viewMode,
}) => {
  return (
    <div
      className={classes["fullcalendar__user"]}
      onClick={(e) => {
        handleResourceClick(arg.id, arg.title, e, arg.extendedProps.scheduleId);
      }}
    >
      {["weekly", "monthly"].includes(viewMode) && (
        <p>{arg._resource.extendedProps.date}</p>
      )}
      <Avatar>
        {arg.title
          .split(" ")
          .map((word) => word[0])
          .join("")}
      </Avatar>
      <h5 className={classes["fullcalendar__user--name"]}>{arg.title}</h5>
      <div
        className={classNames(
          classes["fullcalendar__user--profession"],
          classes["fullcalendar__user--time"]
        )}
      >
        <img src={Icons["pan-tool-alt"]} alt="pan-tool" />
        <p>{arg._resource.extendedProps.role}</p>
      </div>
      <p className={classes["fullcalendar__user--time"]}>08:00 - 22:00</p>
    </div>
  );
};

export default ResourceCard;
