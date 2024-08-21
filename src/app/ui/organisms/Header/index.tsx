"use client";

import styles from "./page.module.scss";
import { Boogaloo } from "next/font/google";

const boogaloo = Boogaloo({
  weight: "400",
  subsets: ["latin"],
});

type HeaderType = {
  count: number;
};

export default function Header({ count }: HeaderType) {
  const logoText = "full count".toUpperCase();

  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${boogaloo.className}`}>{logoText}</div>
      <div className={styles.right_box}>
        <div className={styles.count}>
          残り：<strong>{count}</strong>
        </div>
      </div>
    </div>
  );
}
