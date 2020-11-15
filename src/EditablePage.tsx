import React from 'react'
import EditableBlock from './EditableBlock';
import setCaretToEnd from './utils/SetCreateToEnd';

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const initialBlock = { id: uid(), html: "", tag: "p" };

  class EditablePage extends React.Component<{},any> {
    constructor(props:any) {
      super(props);
      this.updatePageHandler = this.updatePageHandler.bind(this);
      this.addBlockHandler = this.addBlockHandler.bind(this);
      this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
      this.state = { blocks: [initialBlock] };
    }
  
    updatePageHandler(updatedBlock:any) {
      const blocks = this.state.blocks;
      const index = blocks.map((b:any) => b.id).indexOf(updatedBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        tag: updatedBlock.tag,
        html: updatedBlock.html
      };
      this.setState({ blocks: updatedBlocks });
    }
  
    addBlockHandler(currentBlock:any) {
      const newBlock = { id: uid(), html: "", tag: "p" };
      const blocks = this.state.blocks;
      const index = blocks.map((b:any) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index + 1, 0, newBlock);
      this.setState({ blocks: updatedBlocks }, () => {
        currentBlock.ref.nextElementSibling.focus();
      });
    }
  
    deleteBlockHandler(currentBlock:any) {
      const previousBlock = currentBlock.ref.previousElementSibling;
      if (previousBlock) {
        const blocks = this.state.blocks;
        const index = blocks.map((b:any) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index, 1);
        this.setState({ blocks: updatedBlocks }, () => {
          setCaretToEnd(previousBlock);
          previousBlock.focus();
        });
      }
    }
  
    render() {
      return (
        <div className="Page">
          {this.state.blocks.map((block:any, key:any) => {
            return (
              <EditableBlock
                key={key}
                id={block.id}
                tag={block.tag}
                html={block.html}
                updatePage={this.updatePageHandler}
                addBlock={this.addBlockHandler}
                deleteBlock={this.deleteBlockHandler}
              />
            );
          })}
        </div>
      );
    }
  }
  
  export default EditablePage;


// const EditablePage = () => {

//     const [state, setState] = useState( {blocks:[ { id: uid(), html: "", tag: "p" }]})

//     const updatePageHandler = (updatedBlock:any) => {
//         const blocks = state.blocks;
//         const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
//         const updatedBlocks = [...blocks];
//         updatedBlocks[index] = {
//           ...updatedBlocks[index],
//           tag: updatedBlock.tag,
//           html: updatedBlock.html
//         };
//         setState({ blocks: updatedBlocks });
//       }
//     const nextBlockFocus = (currentBlock:any) => currentBlock.ref.nextElementSibling.focus()
//     const addBlockHandler = (currentBlock:any) => {
//         const newBlock = { id: uid(), html: "", tag: "p" };
//         const blocks = state.blocks;
//         const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
//         const updatedBlocks = [...blocks];
//         updatedBlocks.splice(index + 1, 0, newBlock);
//         setState({ blocks: updatedBlocks })
//         nextBlockFocus(currentBlock);
//       }
    
      
//     const deleteBlockHandler = (currentBlock:any) => {
//         const previousBlock = currentBlock.ref.previousElementSibling;
//         if (previousBlock) {
//             const blocks = state.blocks;
//             const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
//             const updatedBlocks = [...blocks];
//             updatedBlocks.splice(index, 1);
//             setState({ blocks: updatedBlocks });
//             SetCaretToEnd(previousBlock);
//             previousBlock.focus();
//         }
//       }
//     return (
//         <div className="Page">
//         {state.blocks.map((block, key) => {
//           return (
//             <EditableBlock
//               key={key}
//               id={block.id}
//               tag={block.tag}
//               html={block.html}
//               updatePage={updatePageHandler}
//               addBlock={addBlockHandler}
//               deleteBlock={deleteBlockHandler}
//             />
//           );
//         })}
//       </div>
//     );
  
// }

// export default EditablePage;