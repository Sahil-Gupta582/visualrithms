import React, { useState, useEffect } from "react";
import randomArr from "../randomArr";

const BinarySearch = () => {
  const [arrDetails, updateArrDetails] = useState({
    arr: [],
    size: 10,
    key: 0,
    elemColor: [],
    keyFound: false,
  });

  const animations = [];

  useEffect(() => {
    generateArr();
  }, []);

  const generateArr = () => {
    const size = Math.floor(Math.random() * 100 + 10);
    const arr = randomArr(size, 1000);
    arr.sort((a, b) => a - b);
    const key = arr[Math.floor(Math.random() * size)];
    const elemColor = Array(size).fill("#1b1");
    const keyFound = false;
    updateArrDetails({ size, arr, key, elemColor, keyFound });
  };

  const search = () => {
    let { arr, size, key, elemColor } = arrDetails;
    let l = 0,
      r = size - 1;
    while (l <= r) {
      let mid = parseInt(l + (r - l) / 2);
      elemColor[mid] = "white";
      animations.push(JSON.stringify(elemColor));
      if (arr[mid] === key) {
        elemColor[mid] = "#ff0000";
        animations.push(JSON.stringify(elemColor));
        return;
      } else if (arr[mid] > key) {
        r = mid - 1;
        for (let i = 0; i < size; ++i) {
          if (!(i >= l && i <= r)) {
            elemColor[i] = "#e1ad01";
          }
        }
        animations.push(JSON.stringify(elemColor));
      } else {
        l = mid + 1;
        for (let i = 0; i < size; ++i) {
          if (!(i >= l && i <= r)) {
            elemColor[i] = "#e1ad01";
          }
        }
        animations.push(JSON.stringify(elemColor));
      }
    }
    return;
  };

  const animate = () => {
    search();
    for (let i = 0; i < animations.length; ++i) {
      setTimeout(() => {
        let animation = JSON.parse(animations[i]);
        updateArrDetails({
          arr: arrDetails.arr,
          key: arrDetails.key,
          size: arrDetails.size,
          elemColor: [...animation],
          keyFound: i === animations.length - 1,
        });
      }, i * 500);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          direction: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          maxWidth: "950px",
        }}
      >
        {arrDetails.arr.map((elem, idx) => {
          return (
            <div
              style={{
                backgroundColor: arrDetails.elemColor[idx],
                padding: "10px",
                color: "FF0000",
                minWidth: "50px",
                margin: "5px",
              }}
              key={idx}
            >
              {arrDetails.elemColor[idx] === "#e1ad01" ? <strike style={{fontWeight: "bold"}}>{elem}</strike> : <span>{elem}</span>}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          animate();
        }}
        style={{
          margin: "10px",
          padding: "15px",
          backgroundColor: "#1b1b",
          fontSize: "1.5em",
          color: "white",
          border: "none",
          borderRadius: "1em",
        }}
      >
        Search {arrDetails.key}
      </button>
      <button
        onClick={() => {
          generateArr();
        }}
        style={{
          margin: "10px",
          padding: "15px",
          backgroundColor: "#0001b1",
          fontSize: "1.5em",
          color: "white",
          border: "none",
          borderRadius: "1em",
        }}
      >
        Reset
      </button>
      {arrDetails.keyFound && <h1 style={{ color: "white" }}>Key Found!</h1>}
    </>
  );
};

export default BinarySearch;
