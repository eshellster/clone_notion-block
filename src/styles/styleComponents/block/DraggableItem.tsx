import styled from "styled-components";

interface Props {}

export default styled.div<Props>`
  .block {
    display: inline-block;
    width: calc(100% - 2rem);
  }
  :hover {
    .block {
      background: ${(props) => props.theme.uiColor.tertiary};
      outline-color: ${(props) => props.theme.uiColor.tertiary};
    }
    .dragHandle {
      opacity: 1;
    }
  }
`;
