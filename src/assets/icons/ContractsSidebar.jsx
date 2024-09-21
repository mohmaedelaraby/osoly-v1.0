import React from "react";

function ContractsSidebar({ fill }) {
  return (
    <>
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 1024 1024"
        class="icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M146.3 73.06v877.71h512l219.43-239.38V73.06H146.3z m512.01 769.46V694.77h135.44L658.31 842.52z m146.27-220.89H585.16v256H219.44V146.2h585.14v475.43z"
          fill={fill}
        />
        <path
          d="M292.59 219.34h438.86v73.14H292.59zM292.59 365.63H658.3v73.14H292.59zM292.59 511.91h219.43v73.14H292.59z"
          fill={fill}
        />
      </svg>
    </>
  );
}

export default ContractsSidebar;
