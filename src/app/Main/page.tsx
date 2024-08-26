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
  faQrcode,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Html5QrcodePlugin from "../ui/molecules/Html5QrcodeScannerPlugin";
import { Html5QrcodeResult } from "html5-qrcode";
import { Html5QrcodeError } from "html5-qrcode/esm/core";

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
  const [cameraOn, setCameraOn] = useState(false);
  const [capturedNumber, setCapturedNumber] = useState<string>("");
  const [qrCheckCoverVisible, setQrCheckCoverVisible] = useState(false);

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

  const handleButtonClick = (id: number, enabled: boolean) => {
    if (!enabled) {
      const shouldEnable = confirm("このボタンを有効化しますか？");
      if (!shouldEnable) {
        return; // 사용자가 취소를 눌렀다면 함수 종료
      }
    }

    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === id ? { ...button, enabled: !enabled } : button
      )
    );

    if (enabled) {
      setRemainingCount((prevCount) => prevCount - 1);
    } else {
      setRemainingCount((prevCount) => prevCount + 1);
    }
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

  const switchOnCamera = () => {
    setCameraOn(!cameraOn);
  };

  const onNewScanResult = (decodedText: string, result: Html5QrcodeResult) => {
    // handle decoded results here
    // console.log("decodedText : ", decodedText);
    setCapturedNumber(decodedText);

    // qr_check_cover를 1.5초 동안 표시
    setQrCheckCoverVisible(true);
    setTimeout(() => {
      setQrCheckCoverVisible(false);
    }, 800);
  };

  function onScanFailure(errorMessage: string, error: Html5QrcodeError) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // console.warn(`Code scan error = ${error.errorMessage}`);
    console.log("error.errorMessage : ", error.errorMessage);
  }

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
    buttons.filter((button) => {
      if (button.id === Number(capturedNumber)) {
        button.enabled = false;
        setRemainingCount(remainingCount - 1);
      }
    });
  }, [capturedNumber]);

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
                  <span>grid</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faList} />
                  <span>list</span>
                </>
              )}
            </button>
          </div>

          {buttons.length ? (
            <div className={styles.qrcode_button}>
              <button onClick={switchOnCamera}>
                {cameraOn ? (
                  <FontAwesomeIcon icon={faCircleXmark} />
                ) : (
                  <FontAwesomeIcon icon={faQrcode} />
                )}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>

      <section>
        {cameraOn ? (
          <>
            <div className={styles.qr_camera}>
              <Html5QrcodePlugin
                fps={1000}
                qrbox={250}
                disableFlip={true}
                aspectRatio={0}
                verbose={false}
                qrCodeSuccessCallback={onNewScanResult}
                qrCodeErrorCallback={onScanFailure}
              />
              {qrCheckCoverVisible && (
                <div className={styles.qr_check_cover}>{capturedNumber}</div>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </section>

      <section>
        <div className={styles.button_wrap} ref={elementRef}>
          {buttons.length > 0 && !cameraOn ? (
            <div
              className={styles.buttons}
              style={isGrid ? blockStyle : gridStyle}
            >
              {buttons.map(({ id, enabled }) => (
                <NumberButton
                  key={id}
                  clickButton={() => handleButtonClick(id, enabled)}
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
