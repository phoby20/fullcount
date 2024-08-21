"use client";

import styles from "./page.module.scss";
import Header from "../ui/organisms/Header";
import NomalButton from "../ui/atoms/NomalButton";
import NumberButton from "../ui/atoms/NumberButton";
import Input from "../ui/atoms/Input";
import { useEffect, useRef, useState } from "react";
import NotCheckedModal from "../ui/organisms/NotCheckedModal";

export default function Main() {
  const [totalUser, setTotalUser] = useState(0); // 숫자를 입력받아 저장
  const [buttons, setButtons] = useState<{ id: number; enabled: boolean }[]>(
    []
  ); // 버튼들의 상태를 저장
  const [clickCount, setClickCount] = useState(0); //클릭한 버튼의 갯수
  const [remainingCount, setRemainingCount] = useState(0); //아직 클릭하지 않은 갯수
  const [showNotCheckedModal, setShowNotCheckedModal] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const updateNumber = (value: string) => {
    setTotalUser(Number(value)); // 입력된 숫자를 totalUser 상태에 저장
  };

  const generateButton = () => {
    const isEnabled = buttons.every((button) => button.enabled);

    if (
      !remainingCount ||
      isEnabled ||
      confirm("すべての記録をリセットし、ボタンを再生成しますか")
    ) {
      const newButtons = Array.from({ length: totalUser }, (_, index) => ({
        id: index + 1,
        enabled: true, // 초기 상태는 활성화된 상태로 설정
      }));
      setButtons(newButtons); // 생성된 버튼 상태를 저장
      setClickCount(0);
      setRemainingCount(totalUser - clickCount);
      setTotalUser(0);
      setShowNotCheckedModal(false);
    }
  };

  const handleButtonClick = (id: number) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, enabled: false } : button
      )
    ); // 클릭된 버튼을 비활성화
    setRemainingCount(remainingCount - 1);
  };

  const switchModal = () => {
    setShowNotCheckedModal(!showNotCheckedModal);
  };

  useEffect(() => {
    if (showNotCheckedModal && elementRef.current) {
      // 세로 스크롤 비활성화
      elementRef.current.style.display = "none";
    } else {
      // 세로 스크롤 활성화
      if (elementRef.current) {
        elementRef.current.style.display = "block";
      }
    }
  }, [showNotCheckedModal]);

  return (
    <div
      className={`${styles.container} ${
        showNotCheckedModal ? styles.hidden_overflow : ""
      }`}
    >
      <Header
        count={remainingCount}
        showModal={switchModal}
        showNotCheckedModal={showNotCheckedModal}
      />
      <section>
        <div className={styles.generate_wrap}>
          <div className={styles.generate}>
            <Input
              type={"number"}
              value={totalUser ? totalUser : ""}
              onChange={updateNumber}
              placeholder={"数字を入力してください"}
            />
            <div className={styles.generate_button}>
              <NomalButton
                clickButton={generateButton}
                buttonName={buttons.length ? "再生成" : "生成"}
                disabled={totalUser ? false : true}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.button_wrap} ref={elementRef}>
          {buttons.length > 0 ? (
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
          ) : (
            <div className={styles.empty_text}>
              <p className={styles.label}>
                生成したいボタンの数を入力して 「生成」
                ボタンをクリックすると、ボタンが表示されます
              </p>
            </div>
          )}
        </div>
      </section>
      {showNotCheckedModal ? (
        <NotCheckedModal count={remainingCount} buttons={buttons} />
      ) : (
        ""
      )}
    </div>
  );
}
