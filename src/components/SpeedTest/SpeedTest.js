import React, { useContext, useEffect, useState } from "react";

import { BsCloudDownload, BsCloudUpload } from "react-icons/bs";

import "./SpeedTest.scss";
import { NetworkProvider } from "../NetworkProvider/NetworkProvider";
import { ACTION_TYPES, STATES } from "../../state-management/constants";
import axiosConfig from "../../axiosConfig/axios-config";
import { BACK_END_POINTS } from "../../apiconstants/apiConstants";
import { AppContext } from "../../state-management/app-context";
import { SaveError } from "../SaveError/SaveError";
import { SpeedTestAccessError } from "../SpeedTestAccessError/SpeedTestAccessError";

export const SpeedTest = () => {
  const [networkProvider, setNetworkProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState("N/A");
  const [uploadSpeed, setUploadSpeed] = useState("N/A");
  const [error, setError] = useState();
  const { data, dispatch } = useContext(AppContext);
  const [saveError, setSaveError] = useState();

  useEffect(() => {
    setResult(null);
    setError(false);
    setSaveError(false);
    setDownloadSpeed("N/A");
    setUploadSpeed("N/A");
    SoMApiInit();
  }, [data[STATES.CURRENT_USER]]);

  const saveResult = async () => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
      const res = await axiosConfig.post(
        BACK_END_POINTS.SPEED_TEST.SAVE_RESULT,
        result
      );
      if (!res.data.isSuccess) {
        throw new Error(JSON.stringify(res.data));
      }
    } catch (e) {
      setSaveError(true);
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
    // console.log(data[STATES.CURRENT_USER].apiKey);
    window.SomApi.account = data[STATES.CURRENT_USER].apiKey;
    setResult(null);
    setError(false);
    setSaveError(false);
    setDownloadSpeed("N/A");
    setUploadSpeed("N/A");
    window.SomApi.startTest();
  };

  const SoMApiInit = () => {
    const api = window.SomApi;
    // api.account = data[STATES.CURRENT_USER["apiKey"]] || undefined; // YOUR API KEY
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
      {saveError && <SaveError />}
      {error && <SpeedTestAccessError />}
      <div className="actions-container">
        <button
          className="btn"
          onClick={startTest}
          disabled={!data[STATES.IS_LOGGED_IN]}
        >
          Start Test
        </button>

        <button className="btn" disabled={result === null} onClick={saveResult}>
          Save Result
        </button>
      </div>
    </div>
  );
};
