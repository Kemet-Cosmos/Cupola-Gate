import React from "react";

const Loading = () => {
  return (
    <div className="z-20 flex flex-col justify-center items-center">
     
      <div data-js="astro" className="astronaut">
        <div className="head"></div>
        <div className="arm arm-left"></div>
        <div className="arm arm-right"></div>
        <div className="body">
          <div className="panel"></div>
        </div>
        <div className="leg leg-left"></div>
        <div className="leg leg-right"></div>
        <div className="schoolbag"></div>
      </div>
      <h3>Loading.....</h3>
    </div>
  );
};

export default Loading;
