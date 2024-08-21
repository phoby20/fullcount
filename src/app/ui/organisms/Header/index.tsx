"use client";

import styles from "./page.module.scss";
import { Boogaloo } from "next/font/google";

const boogaloo = Boogaloo({
  weight: "400",
  subsets: ["latin"],
});

type HeaderType = {
  count: number;
  showModal: () => void;
  showNotCheckedModal: boolean;
};

export default function Header({
  count,
  showModal,
  showNotCheckedModal,
}: HeaderType) {
  const logoText = "full count".toUpperCase();

  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${boogaloo.className}`}>{logoText}</div>
      <div className={styles.right_box}>
        <div className={styles.count}>
          残り <strong>{count}</strong>
          <button className={styles.show_not_checked_modal} onClick={showModal}>
            {showNotCheckedModal ? "閉じる" : "現状確認"}
          </button>
        </div>
      </div>
    </div>
  );
}
