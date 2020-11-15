import React,{RefObject}from 'react';
import ContentEditable,{ContentEditableEvent} from 'react-contenteditable';

interface EditableBlockProps {
    key:number
    id:string
    tag:string
    html:string
    updatePage:any
    addBlock:any
    deleteBlock:any
}

class EditableBlock extends React.Component<EditableBlockProps,any> {
  private contentEditable: RefObject<HTMLDivElement>

  constructor(props:any) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.contentEditable = React.createRef();
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      previousKey: ""
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    const htmlChanged = prevState.html !== this.state.html;
    const tagChanged = prevState.tag !== this.state.tag;
    if (htmlChanged || tagChanged) {
      this.props.updatePage({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag
      });
    }
  }

  onChangeHandler(e:ContentEditableEvent) {
    this.setState({ html: e.target.value });
  }

  onKeyDownHandler(e:any) {
    if (e.key === "/") {
      this.setState({ htmlBackup: this.state.html });
    }
    if (e.key === "Enter") {
      if (this.state.previousKey !== "Shift") {
        e.preventDefault();
        this.props.addBlock({
          id: this.props.id,
          ref: this.contentEditable.current
        });
      }
    }
    if (e.key === "Backspace" && !this.state.html) {
      e.preventDefault();
      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current
      });
    }
    this.setState({ previousKey: e.key });
  }

  render() {
    return (
      <ContentEditable
        className="Block"
        innerRef={this.contentEditable}
        html={this.state.html}
        tagName={this.state.tag}
        onChange={this.onChangeHandler}
        onKeyDown={this.onKeyDownHandler}
      />
    );
  }
}

export default EditableBlock;

// interface EditableBlockProps {
//     key:string
//     id:number
//     tag:string
//     html:string
//     updatePage:any
//     addBlock:any
//     deleteBlock:any
// }

// const EditableBlock = (props:any) => class extends React.Component<ContentEditableEvent> {
//     private contentEditable: RefObject<HTMLDivElement>

//     constructor(props:ContentEditableEvent) {
//       super(props);
//       this.onChangeHandler = this.onChangeHandler.bind(this);
//       this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
//       this.contentEditable = createRef<HTMLDivElement>();
//       this.state = {
//         htmlBackup: null, // needed to store the html temporarely
//         html: "",
//         tag: "p",
//         previousKey: "",
//       };
//     }

//     componentDidMount() {
//         this.setState({ html: this.props.html, tag: this.props.tag });
//       }
//        // Update the page component if one of the following is true:
//   // 1. user has changed the html content
//   // 2. user has changed the tag
//   componentDidUpdate(prevProps:any, prevState:any) {
//     const htmlChanged = prevState.html !== this.state.html;
//     const tagChanged = prevState.tag !== this.state.tag;
//     if (htmlChanged || tagChanged) {
//       this.props.updatePage({
//         id: this.props.id,
//         html: this.state.html,
//         tag: this.state.tag
//       });
//     }
//   }

//   onChangeHandler(e) {
//     this.setState({ html: e.target.value });
//   }

//   onKeyDownHandler(e) {
//     if (e.key === CMD_KEY) {
//       // If the user starts to enter a command, we store a backup copy of
//       // the html. We need this to restore a clean version of the content
//       // after the content type selection was finished.
//       this.setState({ htmlBackup: this.state.html });
//     }
//     if (e.key === "Enter") {
//       // While pressing "Enter" should add a new block to the page, we
//       // still want to allow line breaks by pressing "Shift-Enter"
//       if (this.state.previousKey !== "Shift" && !this.state.selectMenuIsOpen) {
//         e.preventDefault();
//         this.props.addBlock({
//           id: this.props.id,
//           ref: this.contentEditable.current
//         });
//       }
//     }
//     if (e.key === "Backspace" && !this.state.html) {
//       // If there is no content, we delete the block by pressing "Backspace",
//       // just as we would remove a line in a regular text container
//       e.preventDefault();
//       this.props.deleteBlock({
//         id: this.props.id,
//         ref: this.contentEditable.current
//       });
//     }
//     // Store the key to detect combinations like "Shift-Enter" later on
//     this.setState({ previousKey: e.key });
//   }

//   render() {
//     return (
//       <>
//         <ContentEditable
//           className="Block"
//           innerRef={this.contentEditable}
//           html={this.state.html}
//           tagName={this.state.tag}
//           onChange={this.onChangeHandler}
//           onKeyDown={this.onKeyDownHandler}
//           onKeyUp={this.onKeyUpHandler}
//         />
//       </>
//     );
//   }
// }

// export default EditableBlock;

// interface EditableBlockProps {
//     key:number
//     id:string
//     tag:string
//     html:any
//     updatePage:any
//     addBlock:any
//     deleteBlock:any
// }

// function EditableBlock(props:EditableBlockProps){

//     const [state,setState] = React.useState({htmlBackup: null,html: props.html, tag: props.tag,previousKey: ""})
    

//     const onKeyDownHandler = (e:any) => {
//         if (e.key === "/") {
//             e.preventDefault();
//           setState({...state, htmlBackup: state.html });
//         }
//         if (e.key === "Enter") {
//             e.preventDefault();
//           if (state.previousKey !== "Shift") {
//             e.preventDefault();
//             props.addBlock({
//               id: props.id,
//               ref: contentEditable.current
//             });
//           }
//         }
//         if (e.key === "Backspace" && !state.html) {
//           e.preventDefault();
//           props.deleteBlock({
//             id: props.id,
//             ref: contentEditable.current
//           });
//         }
//         setState({...state, previousKey: e.key });
//       }
    
  
//     const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | ContentEditableEvent) => {
//     e.preventDefault();
//       setState({ ...state, html: e.target.value });
//     }
    
//     const contentEditable:any = React.useRef()

//     React.useEffect(() => {
//         const htmlChanged = state.html !== props.html;
//         const tagChanged = state.tag !== props.tag;
//         if (htmlChanged || tagChanged) {
//             console.log("updatePage","htmlChanged :",htmlChanged, "tagChanged:",tagChanged);
            
//             props.updatePage({
//             id: props.id,
//             html: state.html,
//             tag: state.tag
//             });
//         }
//     }, [state])

//     return (
//         <ContentEditable
//         className="Block"
//         ref={contentEditable}
//         html={state.html}
//         tagName={state.tag}
//         onChange={onChangeHandler}
//         onKeyDown={onKeyDownHandler}
//         />
//     );

//   }
  
//   export default EditableBlock;