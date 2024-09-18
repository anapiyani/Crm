import React from "react";
import { Avatar, Button, Checkbox, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import styles from "./styles.module.scss";

const CommentItem = () => {
  return (
    <div className={styles.commentItemWrapper}>
      <Checkbox
        sx={{
          "& svg": { width: 20, height: 20 },
          mt:"2.6rem"
        }}
      />
      <div className={styles.commentItem}>
        <div className={styles.commentHeader}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: "#C7DFF7",
                  "& svg": { color: "var(--primary-400)" },
                }}
              />
              <p className={styles.userName}>Имя Фамилия</p>
            </div>
            <p className={styles.date}>25 май 2019, 18:50</p>
          </div>
          <div className={styles.actions}>
            <IconButton className={styles.iconButton}>
              <Edit />
            </IconButton>
            <IconButton className={styles.iconButton}>
              <Delete />
            </IconButton>
          </div>
        </div>
        <p className={styles.commentText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
    </div>
  );
};

const CommentList = () => {
  return (
    <div className={styles.commentList}>
      <div className={styles.selectAll}>
        <div className={styles.checkbox}>
          <Checkbox sx={{ "& svg": { width: 20, height: 20 } }} />
          <p className={styles.selectAllText}>Выбрать все</p>
        </div>

        <Button
          variant="text"
          className="add-button"
          sx={{
            textTransform: "none",
            padding: "0.4rem 1.6rem",
            fontSize: "1.4rem",
            fontWeight: 400,
            color: "var(--red-500)",
            gap: "0.4rem",
          }}
        >
          Удалить
        </Button>
      </div>
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
};

export default CommentList;
