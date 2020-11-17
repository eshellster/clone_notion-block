import React, { useState } from "react";
import EditableBlock from "./EditableBlock";
import setCaretToEnd from "./utils/SetCreateToEnd";

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// A page is represented by an array containing several blocks
// [
//   {
//     _id: "5f54d75b114c6d176d7e9765",
//     html: "Heading",
//     tag: "h1",
//     imageUrl: "",
//   },
//   {
//     _id: "5f54d75b114c6d176d7e9766",
//     html: "I am a <strong>paragraph</strong>",
//     tag: "p",
//     imageUrl: "",
//   },
//     _id: "5f54d75b114c6d176d7e9767",
//     html: "/im",
//     tag: "img",
//     imageUrl: "images/test.png",
//   }
// ]

const initialBlock = { id: uid(), html: "", tag: "p" };

const EditablePage = () => {
  const [state, setState] = useState({ blocks: [initialBlock] });

  const updatePageHandler = (updatedBlock: any) => {
    // console.log(state.blocks);

    const blocks = state.blocks;
    const index = blocks.map((b: any) => b.id).indexOf(updatedBlock.id);
    // console.log("index",index,"state.blocks.length",state.blocks.length);

    const updatedBlocks = [...blocks];
    // 에디터 블록이 업데이트 되었을때 해당 블록이 마지막 요소라면 바로 아래에 빈 에디터 블록을 추가시킨다.
    if (state.blocks.length === index + 1) {
      updatedBlocks.splice(index + 1, 0, { id: uid(), html: "", tag: "p" });
    }
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
    };
    setState({ blocks: updatedBlocks });
  };

  const addBlockHandler = (currentBlock: any) => {
    const blocks = state.blocks;
    const index = blocks.map((b: any) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    if (state.blocks.length === index + 1) {
      const newBlock = { id: uid(), html: "", tag: "p" };
      updatedBlocks.splice(index + 1, 0, newBlock);
    }
    setState({ blocks: updatedBlocks });

    currentBlock.ref.nextElementSibling.focus();
  };

  const deleteBlockHandler = (currentBlock: any) => {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const blocks = state.blocks;
      const index = blocks.map((b: any) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setState({ blocks: updatedBlocks });

      setCaretToEnd(previousBlock);
      previousBlock.focus();
    }
  };

  return (
    <div className="Page">
      {state.blocks.map((block: any, key: any) => {
        return (
          <EditableBlock
            key={key}
            id={block.id}
            tag={block.tag}
            html={block.html}
            updatePage={updatePageHandler}
            addBlock={addBlockHandler}
            deleteBlock={deleteBlockHandler}
          />
        );
      })}
    </div>
  );
};

export default EditablePage;
