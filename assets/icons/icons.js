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
