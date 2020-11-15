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
      console.log(this.state.blocks);
      
      const blocks = this.state.blocks;
      const index = blocks.map((b:any) => b.id).indexOf(updatedBlock.id);
      console.log("index",index,"this.state.blocks.length",this.state.blocks.length);
      
      const updatedBlocks = [...blocks];
      if(this.state.blocks.length === index+1){
        updatedBlocks.splice(index + 1, 0,{ id: uid(), html: "", tag: "p" })
      }
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        tag: updatedBlock.tag,
        html: updatedBlock.html
      };
      this.setState({ blocks: updatedBlocks });
    }
  
    addBlockHandler(currentBlock:any) {
      const blocks = this.state.blocks;
      const index = blocks.map((b:any) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      if(this.state.blocks.length === index+1){
        const newBlock = { id: uid(), html: "", tag: "p" };
        updatedBlocks.splice(index + 1, 0, newBlock);
      }
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

