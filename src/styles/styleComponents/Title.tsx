import styled from "styled-components"

interface TitleProps {
    readonly primary?: boolean;
  };

export default styled.div<TitleProps>`
font-size: 3rem;
font-weight: 700;
color: ${props => props.primary ? props.theme.colors.black : props.theme.colors.blue};
text-align: center
`