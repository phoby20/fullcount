"use client";

import styles from "./page.module.scss";

export default function Header() {
  const logoText = "full count".toUpperCase();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>{logoText}</div>
    </div>
  );
}
