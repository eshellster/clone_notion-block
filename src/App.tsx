import { pid } from "process";
import React from "react";
import styled from "styled-components";
import EditablePage from "./components/EditablePage";

const fetchedBlocks = [
  {
    _id: "5f54d75b114c6d176d7e9765",
    html: "Heading",
    tag: "h1",
    imageUrl: "",
  },
  {
    _id: "5f54d75b114c6d176d7e9766",
    html: "I am a <strong>paragraph</strong>",
    tag: "p",
    imageUrl: "",
  },
  {
    _id: "5f54d75b114c6d176d7e9767",
    html: "/im",
    tag: "img",
    imageUrl: "images/test.png",
  },
];
const App = () => {
  return (
    <LayoutRoot>
      <Content>
        <EditablePage id={pid} fetchedBlocks={fetchedBlocks} />
      </Content>
    </LayoutRoot>
  );
};

export default App;

const LayoutRoot = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  justify-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  padding: 1rem 0 1rem 1rem;
  margin: 0;
`;
