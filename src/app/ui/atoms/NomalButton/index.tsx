"use client";

import styles from "./page.module.scss";

type NomalButtonType = {
  buttonName: string;
  clickButton: () => void;
  disabled?: boolean; // disabled 속성 추가
};

export default function NomalButton({
  buttonName,
  clickButton,
  disabled = false,
}: NomalButtonType) {
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
