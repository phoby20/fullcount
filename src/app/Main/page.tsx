"use client";

import styles from "./page.module.scss";
import Header from "../ui/organisms/Header";
import NomalButton from "../ui/atoms/NomalButton";
import NumberButton from "../ui/atoms/NumberButton";
import Input from "../ui/atoms/Input";
import { useState } from "react";

export default function Main() {
  const [totalUser, setTotalUser] = useState(0); // 숫자를 입력받아 저장
  const [buttons, setButtons] = useState<{ id: number; enabled: boolean }[]>(
    []
  ); // 버튼들의 상태를 저장

  const updateNumber = (value: string) => {
    setTotalUser(Number(value)); // 입력된 숫자를 totalUser 상태에 저장
  };

  const generateButton = () => {
    const newButtons = Array.from({ length: totalUser }, (_, index) => ({
      id: index + 1,
      enabled: true, // 초기 상태는 활성화된 상태로 설정
    }));
    setButtons(newButtons); // 생성된 버튼 상태를 저장
  };

  const handleButtonClick = (id: number) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, enabled: false } : button
      )
    ); // 클릭된 버튼을 비활성화
  };

  return (
    <div className={styles.container}>
      <Header />
      <section>
        <p className={styles.label}>
          生成したい数字を入力して 「生成」 ボタンをクリックしてください。
        </p>
        <div className={styles.generate}>
          <Input
            type={"number"}
            onChange={updateNumber}
            placeholder={"数字を入力してください"}
          />
          <div className={styles.generate_button}>
            <NomalButton clickButton={generateButton} buttonName={"生成"} />
          </div>
        </div>
      </section>

      <section>
        <div className={styles.buttons}>
          {buttons.map(({ id, enabled }) => (
            <NumberButton
              key={id}
              clickButton={() => handleButtonClick(id)}
              buttonName={String(id)}
              disabled={!enabled} // 버튼이 비활성화된 경우 disabled 속성 추가
            />
          ))}
        </div>
      </section>
    </div>
  );
}
