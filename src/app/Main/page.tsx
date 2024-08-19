"use client";

import styles from "./page.module.scss";
import Header from "../ui/organisms/Header/page";
import Button from "../ui/atoms/Button/page";
import NumberButton from "../ui/atoms/NumberButton/page";
import Input from "../ui/atoms/Input/pages";
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
        <div className={styles.generate}>
          <Input type={"number"} onChange={updateNumber} />
          <Button clickButton={generateButton} buttonName={"生成"} />
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
