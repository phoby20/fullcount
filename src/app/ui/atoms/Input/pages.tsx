"use client";

import styles from "./page.module.scss";

type InputType = {
  type: string;
  onChange?: (e: string) => void;
};

export default function Input({ type, onChange }: InputType) {
  return (
    <input
      className={styles.input}
      type={type}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
    />
  );
}
