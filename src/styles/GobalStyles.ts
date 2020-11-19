import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  body {
    background-color:#F9FAFB;
    
    margin:0;
  }
  a{
    color: #2f4054;
    text-decoration:none;
  }
  h1{
    font-size: 3rem;
  }
  h2{
    font-size: 2rem;
  }
  h3{
    font-size: 1.5rem;
  }
  h4{
    font-size: 1rem;
  }
  input:focus{
        outline:none;
    }

`;

export default GlobalStyle;
