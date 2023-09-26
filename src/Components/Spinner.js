import React, { Component } from "react";
import loader from "./loader.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img
        src={loader}
        alt="loader"
        style={{
          width: "5%",
          height: "5%",
        }}
      />
    </div>
  );
};

export default Spinner;
