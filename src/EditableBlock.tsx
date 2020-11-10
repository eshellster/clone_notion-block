import React from 'react';
import ContentEditable from 'react-contenteditable';

function EditableBlock(props:any){

    const [state,setState] = React.useState({html: props.html, tag: props.tag})
    const [prevState,setPrevState] = React.useState({html: props.html, tag: props.tag})


    // constructor(props) {
    //   super(props);
    //   this.onChangeHandler = this.onChangeHandler.bind(this);
    //   this.contentEditable = React.createRef();
    //   this.state = {
    //     html: "",
    //     tag: "p",
    //   };
    // }
  
    // componentDidMount() {
    //   this.setState({ html: props.html, tag: props.tag });
    // }
  
    // componentDidUpdate(prevProps, prevState) {
    //   const htmlChanged = prevState.html !== props.state.html;
    //   const tagChanged = prevState.tag !== props.state.tag;
    //   if (htmlChanged || tagChanged) {
    //     this.props.updatePage({
    //       id: this.props.id,
    //       html: this.state.html,
    //       tag: this.state.tag
    //     });
    //   }
    // }
  
    const onChangeHandler = (e:any) => {
      props.setState({ html: e.target.value });
    }
    
    const contentEditable:any = React.useRef()

    React.useEffect(() => {
        const htmlChanged = state.html !== props.state.html;
        const tagChanged = prevState.tag !== props.state.tag;
        if (htmlChanged || tagChanged) {
            props.updatePage({
            id: props.id,
            html: state.html,
            tag: state.tag
            });
        }
    }, [state])

    return (
        <ContentEditable
        className="Block"
        ref={contentEditable}
        html={state.html}
        tagName={state.tag}
        onChange={onChangeHandler}
        />
    );

  }
  
  export default EditableBlock;