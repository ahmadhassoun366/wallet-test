import React from "react";
import { useQuery } from "react-query";

const UserNounce = () => {
  const userAddress = "0x61Bd8fc1e30526Aaf1C4706Ada595d6d236d9883"; // Hardcoded user address

  const fetchUserBalance = async () => {
    const res = await fetch(
      `https://pwrexplorerbackend.pwrlabs.io/nonceOfUser/?userAddress=${userAddress}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };

  const { data, error, isLoading } = useQuery(
    ["userBalance", userAddress],
    fetchUserBalance
  );
  console.log("userBalance", data);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  // Check if the status of the request is not success
  if (data.status !== "success") return "Failed to fetch user balance";

  return (
    <div>
      <h2>User Nonce</h2>
      <p>Nonce: {data.data.nonce} </p>
    </div>
  );
};

export default UserNounce;
