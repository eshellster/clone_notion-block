import styled from "styled-components";

interface Props {}

export default styled.div<Props>`
  display: inline-block;
  width: calc(100% - 1rem);
  padding: 0.25rem;
  input {
    /* display: none; */
  }
  img {
    display: block;
    max-height: 600px;
    max-width: 10%;
    margin: 0 auto;
  }
`;
