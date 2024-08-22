"use client";

import styles from "./page.module.scss";
import Header from "../ui/organisms/Header";
import NomalButton from "../ui/atoms/NomalButton";
import NumberButton from "../ui/atoms/NumberButton";
import Input from "../ui/atoms/Input";
import { useEffect, useRef, useState } from "react";
import NotCheckedModal from "../ui/organisms/NotCheckedModal";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faList,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

const blockStyle = {
  display: "flex",
  flexDirection: "column",
};
const gridStyle = {
  display: "grid",
};

export default function Main() {
  const [totalUser, setTotalUser] = useState(0); // 숫자를 입력받아 저장
  const [buttons, setButtons] = useState<{ id: number; enabled: boolean }[]>(
    []
  ); // 버튼들의 상태를 저장
  const [clickCount, setClickCount] = useState(0); //클릭한 버튼의 갯수
  const [remainingCount, setRemainingCount] = useState(0); //아직 클릭하지 않은 갯수
  const [showNotCheckedModal, setShowNotCheckedModal] = useState(false);
  const [isGrid, setIsgrid] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [capturedNumber, setCapturedNumber] = useState<string>("");

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

  const switchGridButton = () => {
    setIsgrid(!isGrid);
  };

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; //Chrome에서 동작하도록; deprecated
  };

  const readyCamera = async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // 후면 카메라 사용
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    }
  };

  const startCamera = () => {
    setCameraOn(true);
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

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

  useEffect(() => {
    readyCamera();
  }, [cameraOn]);

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
            <button
              className={styles.generate_align_button}
              onClick={switchGridButton}
            >
              {isGrid ? (
                <>
                  <FontAwesomeIcon icon={faGripVertical} />
                  grid
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faList} />
                  list
                </>
              )}
            </button>
          </div>

          {buttons.length ? (
            <div className={styles.camera_button}>
              <button onClick={startCamera}>
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>

      <section>
        {cameraOn ? (
          <div className={styles.canvas_wrap}>
            <video ref={videoRef} width="100%" height="auto"></video>
          </div>
        ) : (
          ""
        )}
      </section>

      <section>
        <div className={styles.button_wrap} ref={elementRef}>
          {buttons.length > 0 ? (
            <div
              className={styles.buttons}
              style={isGrid ? blockStyle : gridStyle}
            >
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
