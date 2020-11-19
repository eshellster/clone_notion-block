import ContentEditable from "react-contenteditable";
import styled from "styled-components";

interface Props {
  // readonly blockSelected?: boolean;
  // readonly placeholder?: boolean;
  // readonly isDragging?: boolean;
  // readonly dragHandle?: boolean;
}

export default styled(ContentEditable)<Props>`
  padding: 0.25rem;
  // Better support for safari
  -webkit-user-select: text;
  user-select: text;

  &.blockSelected,
  &.isDragging,
  &:focus {
    background: ${(props) => props.theme.uiColor.tertiary};
    outline-color: ${(props) => props.theme.uiColor.tertiary};
  }

  &.blockSelected {
    image {
      opacity: 0.75;
    }
  }

  &.placeholder {
    color: rgba(72, 72, 72, 0.25);
  }
`;
