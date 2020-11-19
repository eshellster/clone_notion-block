import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    uiColor: {
      primary: string;
      secondary: string;
      tertiary: string;
      text: string;
      error: string;
    };
    colors: {
      background: string;
      black: string;
      gray: string;
      darkGray: string;
      lightGray: string;
      red: string;
      blue: string;
      darkBlue: string;
      lightPurple: string;
      warning: string;
    };
    maxWidth: string;
    boxBorder: string;
    boxBorderWarning: string;
    borderRadius: string;
    whiteBox: any;
    puzzTextWidht: string;
    button: any;
  }
}
