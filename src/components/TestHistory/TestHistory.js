import React from "react";
import "./TestHistory.scss";
import { BsCloudDownload, BsCloudUpload } from "react-icons/bs";

export const TestHistory = ({ pastTest }) => {
  console.log("Inside Test History componeent");
  console.log(pastTest);
  return (
    <div>
      <div className="speed-test-info">
        <div id="network-provider-container">
          <p className="isp-list">{pastTest.isp}</p>
          <p className="city">{pastTest.address}</p>
        </div>

        <div className="speed download-speed">
          <p className="title">
            <BsCloudDownload id="download-icon" className="icon" />
            <span className="download-tag">Download</span>
          </p>
          <p className="metric">{pastTest.download}</p>
          <p className="unit">Mbps</p>
        </div>

        <div className="speed upload-speed">
          <p className="title">
            <BsCloudUpload id="upload-icon" className="icon" />
            <span className="upload-tag">Upload</span>
          </p>
          <p className="metric">{pastTest.upload}</p>
          <p className="unit">Mbps</p>
        </div>
      </div>
      <div className="results-container">
        <p>
          <span className="label"> IP : </span>
          <span>{pastTest.ip_address}</span>
        </p>
        <p>
          <span className="label"> Date : </span>
          <span>{new Date(pastTest.testDate).toLocaleDateString()}</span>
        </p>

        <p>
          <span className="label"> Max Download : </span>
          <span>{pastTest.maxDownload}</span>
        </p>

        <p>
          <span className="label"> Max Upload : </span>
          <span>{pastTest.maxUpload}</span>
        </p>
      </div>
    </div>
  );
};
