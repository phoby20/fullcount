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
      className={styles.button}
      onClick={clickButton}
      disabled={disabled} // 버튼이 비활성화된 경우 클릭 불가능
    >
      {buttonName}
    </button>
  );
}
