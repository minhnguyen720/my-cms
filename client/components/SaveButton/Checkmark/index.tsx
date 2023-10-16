import React, { useEffect, useState } from "react";
import styles from "./Checkmark.module.css";

const Checkmark = ({ isClick, setIsClick }) => {
  const [svgClassStyle, setSvgClassStyle] = useState<string>("progress");

  // for dynamic spinner
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    const timeout = (ms: number) => {
      return new Promise((res) => {
        setTimeout(res, ms);
      });
    };

    const start = async () => {
      await timeout(2200);
      setSvgClassStyle((prev) => {
        if (prev === "ready") return "progress";
        else if (prev === "progress") return "ready";
      });
    };

    if (isClick) {
      start().then(() => {
        setTimeout(() => {
          setIsClick(false);
        }, 1000);
      });
    }
  }, [isClick]);

  return (
    <div className="relative flex h-fit w-fit items-center justify-center bg-transparent">
      <svg
        className={styles[svgClassStyle]}
        id={styles["check"]}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
      >
        <circle
          id={styles["circle"]}
          cx="50"
          cy="50"
          r="46"
          fill="transparent"
        />
        <polyline
          id={styles["tick"]}
          points="25,55 45,70 75,33"
          fill="transparent"
        />
      </svg>
      <svg style={{ width: "70px", height: "70px" }}>
        <use href="#check" />
      </svg>
      <svg style={{ width: "25px", height: "25px" }}>
        <use href="#check" />
      </svg>
      <svg style={{ width: "15px", height: "15px" }}>
        <use href="#check" />
      </svg>
    </div>
  );
};

export default Checkmark;
