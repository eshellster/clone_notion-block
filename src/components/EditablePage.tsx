import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import EditableBlock from "./EditableBlock";
import Notice from "./Notis";
import { usePrevious } from "../hooks";
import SetCaretToEnd from "../utils/SetCreateToEnd";
import ObjectId from "../utils/ObjectId";

// A page is represented by an array containing several blocks

type BlockType = {
  _id: string;
  html: string;
  tag: string;
  imageUrl: string;
};
interface EditablePageProps {
  id: number;
  fetchedBlocks: BlockType[];
  err?: any;
}

const EditablePage = ({ id, fetchedBlocks, err }: EditablePageProps) => {
  // const router = useRouter();
  const [blocks, setBlocks] = useState(fetchedBlocks);
  const [currentBlockId, setCurrentBlockId] = useState<string>("");

  const prevBlocks = usePrevious(blocks);

  // if (err) {
  //   return (
  //     <Notice status="ERROR">
  //       <h3>Something went wrong 💔</h3>
  //       <p>Have you tried to restart the app at '/' ?</p>
  //     </Notice>
  //   );
  // }

  // Update the database whenever blocks change
  useEffect(() => {
    const updatePageOnServer = async (blocks: BlockType[]) => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blocks: blocks,
          }),
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (prevBlocks && prevBlocks !== blocks) {
      updatePageOnServer(blocks);
    }
  }, [blocks, prevBlocks, id]);

  // Handling the cursor and focus on adding and deleting blocks

  const deleteImageOnServer = async (imageUrl: string) => {
    // The imageUrl contains images/name.jpg, hence we do not need
    // to explicitly add the /images endpoint in the API url
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/pages/${imageUrl}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const updateBlockHandler = (currentBlock: BlockType) => {
    const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
    const oldBlock = blocks[index];
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
    // If the image has been changed, we have to delete the
    // old image file on the server
    if (oldBlock.imageUrl && oldBlock.imageUrl !== currentBlock.imageUrl) {
      deleteImageOnServer(oldBlock.imageUrl);
    }
  };

  const addBlockHandler = (currentBlock: BlockType) => {
    setCurrentBlockId(currentBlock._id);
    const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
    const updatedBlocks = [...blocks];
    const newBlock = { _id: ObjectId(), tag: "p", html: "", imageUrl: "" };
    updatedBlocks.splice(index + 1, 0, newBlock);
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock: BlockType) => {
    setCurrentBlockId(currentBlock._id);
    const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
    const deletedBlock = blocks[index];
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
    // If the deleted block was an image block, we have to delete
    // the image file on the server
    if (deletedBlock.tag === "img" && deletedBlock.imageUrl) {
      deleteImageOnServer(deletedBlock.imageUrl);
    }
  };

  const onDragEndHandler = (result: any) => {
    const { destination, source } = result;

    // If we don't have a destination (due to dropping outside the droppable)
    // or the destination hasn't changed, we change nothing
    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedBlocks = [...blocks];
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
    setBlocks(updatedBlocks);
  };

  // const isNewPublicPage = router.query.public === "true";

  useEffect(() => {
    // If a new block was added, move the caret to it
    if (prevBlocks) {
      if (prevBlocks.length + 1 === blocks.length) {
        const nextBlockPosition =
          blocks.map((b) => b._id).indexOf(currentBlockId) + 1 + 1;
        const nextBlock: HTMLElement | null = document.querySelector(
          `[data-position="${nextBlockPosition}"]`
        );
        if (nextBlock) {
          nextBlock.focus();
        }
      }
    }
    // If a block was deleted, move the caret to the end of the last block
    if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      const lastBlockPosition = prevBlocks
        .map((b) => b._id)
        .indexOf(currentBlockId);
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`
      );
      if (lastBlock) {
        SetCaretToEnd(lastBlock);
      }
    }
  }, [blocks, prevBlocks, currentBlockId]);

  return (
    <>
      <Notice dismissible>
        <h4>Hey 👋 You just created a public page.</h4>
        <p>It will be automatically deleted after 24 hours.</p>
      </Notice>

      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId={String(id)}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {blocks.map((block) => {
                const position =
                  blocks.map((b) => b._id).indexOf(block._id) + 1;
                return (
                  <EditableBlock
                    key={block._id}
                    position={position}
                    id={block._id}
                    tag={block.tag}
                    html={block.html}
                    imageUrl={block.imageUrl}
                    pageId={id}
                    addBlock={addBlockHandler}
                    deleteBlock={deleteBlockHandler}
                    updateBlock={updateBlockHandler}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default EditablePage;
