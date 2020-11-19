import { DefaultTheme } from "styled-components";

const BOX_BORDER = "1px solid #e6e6e6";
const BORDER_RADIUS = "4px";

const theme: DefaultTheme = {
  uiColor: {
    primary: "#0F2E53",
    secondary: "#EDEDED",
    tertiary: "#F5F6FB",
    text: "#484848",
    error: "#ff0033",
  },
  colors: {
    background: "#F9FAFB",
    black: "#2f4054",
    gray: "#898989",
    darkGray: "#979797",
    lightGray: "#D8D8D8",
    red: "#ED4956",
    blue: "#0098FE",
    darkBlue: "#003569",
    lightPurple: "#A56778",
    warning: "#fc2a1c",
  },
  maxWidth: "1280px",
  boxBorder: "1px solid #e6e6e6",
  boxBorderWarning: "1px solid #FF5733",
  borderRadius: "4px",
  whiteBox: `border:${BOX_BORDER};
             border-radius:${BORDER_RADIUS};
             background-color:white;
            `,
  puzzTextWidht: "700px",
  button: `background-color: transparent;
    border: 2px solid white;
    border-radius: 4px;
    display: inline-block;
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    letter-spacing: 1px;
    margin: 5px;
    overflow: hidden;
    padding: 0 22px;
    text-align: center;
    text-transform: uppercase;
    transition: all .2s ease-in-out;`,
};

export { theme };
