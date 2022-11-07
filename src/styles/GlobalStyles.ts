import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --mauve: #7A4988;
    --periwinkle: #BE93D4;
    --lilac: #B65FCF;
    --black: #2E2E2E;
    --white: #FFF;
    --grey: #EFEFEF;
  }
  body {
    font-size: 2rem;
  }
`;

export default GlobalStyles;
