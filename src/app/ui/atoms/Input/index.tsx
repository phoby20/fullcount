"use client";

import styles from "./page.module.scss";

type InputType = {
  type: string;
  onChange?: (e: string) => void;
  placeholder: string;
};

export default function Input({ type, onChange, placeholder }: InputType) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
    />
  );
}
