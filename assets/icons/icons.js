import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DarkModeButton = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      fill="#F7F7F7"
      d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
    />
    <Path
      stroke="#080613"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 20v-2a4 4 0 0 1 4-4h2m8 0h2a4 4 0 0 1 4 4v2m0 8v2a4 4 0 0 1-4 4h-2m-8 0h-2a4 4 0 0 1-4-4v-1.444M24 29c3.078 0 5.75-2.427 7.088-3.899a1.62 1.62 0 0 0 0-2.202C29.75 21.426 27.078 19 24 19c-3.078 0-5.75 2.427-7.088 3.899a1.62 1.62 0 0 0 0 2.202C18.25 26.574 20.922 29 24 29Zm2-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </Svg>
);

export { DarkModeButton };

const CarIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 17h8m-8 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m12 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0M10 5v6m-6 0 .332-1.99c.237-1.424.356-2.137.711-2.671a3 3 0 0 1 1.27-1.076C6.9 5 7.622 5 9.066 5h3.365c.94 0 1.409 0 1.835.13a3 3 0 0 1 1.033.552c.345.283.605.674 1.126 1.455L19 11M4 17h-.4c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C2 16.24 2 15.96 2 15.4v-1.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 11 4.08 11 5.2 11h12c.743 0 1.115 0 1.426.05a4 4 0 0 1 3.325 3.324c.049.311.049.683.049 1.426 0 .186 0 .279-.012.356a1 1 0 0 1-.832.832c-.077.012-.17.012-.356.012H20"
    ></Path>
  </Svg>
);

export { CarIcon };

