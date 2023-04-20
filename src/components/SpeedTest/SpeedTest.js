import React, { useEffect, useState } from "react";

import { BsCloudDownload, BsCloudUpload } from "react-icons/bs";

import "./SpeedTest.scss";
import { NetworkProvider } from "../NetworkProvider/NetworkProvider";

export const SpeedTest = () => {
  const [networkProvider, setNetworkProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState("N/A");
  const [uploadSpeed, setUploadSpeed] = useState("N/A");

  useEffect(() => {
    SoMApiInit();
  }, []);

  const saveResult = () => {
    console.log("TODO: SAVE RESULT");
  };

  const onTestCompleted = (testResult) => {
    setResult(testResult);
    setUploadSpeed(testResult.upload);
    setDownloadSpeed(testResult.download);
    console.log(testResult);
  };

  const onError = () => {};

  const onProgress = (progress) => {
    if (progress.type === "download") {
      setDownloadSpeed(progress.currentSpeed);
    } else {
      setUploadSpeed(progress.currentSpeed);
    }
  };

  const startTest = () => {
    setResult(null);
    setDownloadSpeed("N/A");
    setUploadSpeed("N/A");
    window.SomApi.startTest();
  };

  const SoMApiInit = () => {
    const api = window.SomApi;
    api.account = ""; // YOUR API KEY
    api.domainName = "localhost";
    api.config.sustainTime = 4;
    api.config.testServerEnabled = true;
    api.config.userInfoEnabled = true;
    api.config.latencyTestEnabled = false;
    api.config.uploadTestEnabled = true;
    api.config.progress.enabled = true;
    api.config.progress.verbose = true;
    api.onTestCompleted = onTestCompleted;
    api.onError = onError;
    api.onProgress = onProgress;
  };

  return (
    <div id="speed-test-container">
      <div className="speed-test-info">
        <NetworkProvider
          networkProvider={networkProvider}
          setNetworkProvider={setNetworkProvider}
        />

        <div className="speed download-speed">
          <p className="title">
            <BsCloudDownload id="download-icon" className="icon" />
            Download
          </p>
          <p className="metric">{downloadSpeed}</p>
          <p className="unit">Mbps</p>
        </div>

        <div className="speed upload-speed">
          <p className="title">
            <BsCloudUpload id="upload-icon" className="icon" />
            Upload
          </p>
          <p className="metric">{uploadSpeed}</p>
          <p className="unit">Mbps</p>
        </div>
      </div>
      {result && (
        <div className="results-container">
          <p>
            <span className="label"> IP : </span>
            <span>{result.ip_address}</span>
          </p>
          <p>
            <span className="label"> Date : </span>
            <span>{new Date(result.testDate).toLocaleDateString()}</span>
          </p>

          <p>
            <span className="label"> Max Download : </span>
            <span>{result.maxDownload}</span>
          </p>

          <p>
            <span className="label"> Max Upload : </span>
            <span>{result.maxUpload}</span>
          </p>
        </div>
      )}

      <div className="actions-container">
        <button id="start-button" onClick={startTest}>
          Start Test
        </button>

        <button
          id="save-button"
          disabled={result === null}
          onClick={saveResult}
        >
          Save Result
        </button>
      </div>
    </div>
  );
};
