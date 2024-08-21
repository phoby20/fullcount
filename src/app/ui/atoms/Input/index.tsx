"use client";

import styles from "./page.module.scss";

type InputType = {
  type: string;
  value: number | string;
  onChange?: (e: string) => void;
  placeholder: string;
};

export default function Input({
  type,
  value,
  onChange,
  placeholder,
}: InputType) {
  return (
    <input
      className={styles.input}
      type={type}
      value={String(value)}
      placeholder={placeholder}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
    />
  );
}
