import React, { useContext, useEffect, useState } from "react";

import { BsCloudDownload, BsCloudUpload } from "react-icons/bs";

import "./SpeedTest.scss";
import { NetworkProvider } from "../NetworkProvider/NetworkProvider";
import { ACTION_TYPES } from "../../state-management/constants";
import axiosConfig from "../../axiosConfig/axios-config";
import { BACK_END_POINTS } from "../../apiconstants/apiConstants";
import { AppContext } from "../../state-management/app-context";

export const SpeedTest = () => {
  const [networkProvider, setNetworkProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState("N/A");
  const [uploadSpeed, setUploadSpeed] = useState("N/A");
  const [error, setError] = useState();
  const { dispatch } = useContext(AppContext);
  const [saveError, setSaveError] = useState();

  useEffect(() => {
    SoMApiInit();
  }, []);

  const saveResult = async () => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
      const res = await fetch(BACK_END_POINTS.SPEED_TEST.SAVE_RESULT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
      const data = await res.json();
      if (data.isSuccess) {
        throw new Error(JSON.stringify(res.data));
      }
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    } catch (e) {
      console.log("ERR on Save : ", e);
    }
  };

  const onTestCompleted = (testResult) => {
    setResult(testResult);
    setUploadSpeed(testResult.upload);
    setDownloadSpeed(testResult.download);
    console.log(testResult);
  };

  const onError = (error) => {
    console.log("ERR :", error);
    if (error.code === 1001) {
      setError(true);
    }
  };

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
    api.account = "SOM6441515c70a8c"; // YOUR API KEY
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

      {error && (
        <div className="error-message-container">
          <p>
            Sorry, you don't have access to do speed test. Please click the
            following button to request access
          </p>
          <button>Request access</button>
        </div>
      )}

      <div className="actions-container">
        <button className="btn" onClick={startTest}>
          Start Test
        </button>

        <button className="btn" disabled={result === null} onClick={saveResult}>
          Save Result
        </button>
      </div>
    </div>
  );
};
