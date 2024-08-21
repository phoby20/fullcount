"use client";

import styles from "./page.module.scss";

type HeaderType = {
  count: number;
};

export default function Header({ count }: HeaderType) {
  const logoText = "full count".toUpperCase();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>{logoText}</div>
      <div className={styles.right_box}>
        <div className={styles.count}>
          残り：<strong>{count}</strong>
        </div>
      </div>
    </div>
  );
}
