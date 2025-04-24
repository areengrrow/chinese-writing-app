import React from "react";

const SvgGrid = ({ width = "100%", height = "100%" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 100 100"
    >
      <line x1="0" y1="0" x2="100" y2="100" stroke="#DDD" />
      <line x1="100" y1="0" x2="0" y2="100" stroke="#DDD" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="#DDD" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#DDD" />
    </svg>
  );
};

export default SvgGrid;
