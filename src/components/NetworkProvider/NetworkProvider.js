import React, { useEffect, useState } from "react";

import "./NetworkProvider.scss";
import axiosConfig from "../../axiosConfig/axios-config";

export const NetworkProvider = ({ networkProvider, setNetworkProvider }) => {
  // const [networkProvider, setNetworkProvider] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNetworkProvider();
  }, []);
  const getNetworkProvider = async () => {
    try {
      setLoading(true);
      const result = await axiosConfig.get("http://ip-api.com/json");
      setNetworkProvider(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNetworkProvider("Unable to detect ISP");
    }
  };

  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <div id="network-provider-container">
      <p className="isp">{networkProvider.isp}</p>
      <p className="city">{`${networkProvider.city}, ${networkProvider.region}, ${networkProvider.countryCode}`}</p>
    </div>
  );
};
