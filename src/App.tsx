import { pid } from "process";
import React from "react";
import EditablePage from "./components/EditablePage";
import DragDrop from "./DragDrop";

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
    <>
      <DragDrop />
      <EditablePage id={pid} fetchedBlocks={fetchedBlocks} />
    </>
  );
};

export default App;
