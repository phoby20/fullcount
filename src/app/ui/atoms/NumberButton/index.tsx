"use client";

import styles from "./page.module.scss";

type NumberButtonType = {
  buttonName: string;
  clickButton: () => void;
  disabled?: boolean; // disabled 속성 추가
};

export default function NumberButton({
  buttonName,
  clickButton,
  disabled = false,
}: NumberButtonType) {
  return (
    <button
      className={`${styles.button} ${!disabled ? "" : styles.disabled}`}
      onClick={clickButton}
    >
      {buttonName}
    </button>
  );
}
