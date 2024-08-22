import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeError } from "html5-qrcode/esm/core";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

type Html5QrcodePluginType = {
  fps: number;
  qrbox: number;
  disableFlip: boolean;
  aspectRatio: number;
  verbose: boolean;
  qrCodeSuccessCallback: (
    decodedText: string,
    result: Html5QrcodeResult
  ) => void;
  qrCodeErrorCallback: (errorMessage: string, error: Html5QrcodeError) => void;
};

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Html5QrcodePluginType) => {
  let config = {
    fps: 0,
    qrbox: 0,
    disableFlip: false,
    aspectRatio: 0,
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props: Html5QrcodePluginType) => {
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      console.log("component unmount");
      html5QrcodeScanner
        .clear()
        .then(() => {
          console.log("Camera successfully stopped.");
        })
        .catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
