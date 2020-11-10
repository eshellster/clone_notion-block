import React, { useState } from 'react'

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };


const EditablePage = () => {
    const [state, setState] = useState( {blocks:[ { id: uid(), html: "", tag: "p" }]})
    return (
      <div className="Page">
        {state.blocks.map((block, key) => {
          return (
            <div key={key} id={block.id}>
              Tag: {block.tag}, Content: {block.html}
            </div>
          );
        })}
      </div>
    );
  
}

export default EditablePage;