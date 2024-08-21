"use client";

import { useState } from "react";
import styles from "./page.module.scss";

type NotCheckedModalType = {
  count: number;
  buttons: {
    id: number;
    enabled: boolean;
  }[];
};

export default function NotCheckedModal({
  count,
  buttons,
}: NotCheckedModalType) {
  const [numberText, setNumberText] = useState("");

  const notCheckedNumbers = buttons
    .map((button) => {
      if (button.enabled) {
        return button.id;
      }
    })
    .filter((item) => item !== undefined)
    .join(", ");

  return (
    <div className={styles.container}>
      {count ? (
        <div className={styles.contents}>
          <div className={styles.title}>未チェック番号</div>
          <div className={styles.numbers}>{notCheckedNumbers}</div>
        </div>
      ) : (
        "未チェック番号がありません。"
      )}
    </div>
  );
}
