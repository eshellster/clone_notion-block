import React, { RefObject } from "react";
import TagSelectorMenu from "./TagSelectorMenu";
import ActionMenu from "./ActionMenu";
import { GetCaretCoordinates } from "../utils/GetCaretCoordinates";
import { SetCaretToEnd } from "../utils/SetCreateToEnd";
import { GetSelection } from "../utils/GetSelection";
import { DraggalbleIcon } from "../images/Icon";

import { Draggable } from "react-beautiful-dnd";

import styled from "styled-components";
import ContentEditable from "react-contenteditable";

const CMD_KEY = "/";

interface EditableBlockProps {
  key: string;
  id: string;
  tag?: string;
  html?: string;
  updatePage?: any;
  addBlock?: any;
  deleteBlock?: any;
  position?: any;
  imageUrl?: any;
  updateBlock?: any;
  pageId?: any;
}

interface addPlaceholderProps {
  block: any;
  position: any;
  content: any;
}

class EditableBlock extends React.Component<EditableBlockProps, any> {
  private contentEditable: RefObject<HTMLDivElement>;
  fileInput: HTMLInputElement | null;

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDragHandleClick = this.handleDragHandleClick.bind(this);
    this.openActionMenu = this.openActionMenu.bind(this);
    this.closeActionMenu = this.closeActionMenu.bind(this);
    this.openTagSelectorMenu = this.openTagSelectorMenu.bind(this);
    this.closeTagSelectorMenu = this.closeTagSelectorMenu.bind(this);
    this.handleTagSelection = this.handleTagSelection.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.addPlaceholder = this.addPlaceholder.bind(this);
    this.calculateActionMenuPosition = this.calculateActionMenuPosition.bind(
      this
    );
    this.calculateTagSelectorMenuPosition = this.calculateTagSelectorMenuPosition.bind(
      this
    );
    this.contentEditable = React.createRef();
    this.fileInput = null;
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      imageUrl: "",
      placeholder: false,
      previousKey: null,
      isTyping: false,
      tagSelectorMenuOpen: false,
      tagSelectorMenuPosition: {
        x: null,
        y: null,
      },
      actionMenuOpen: false,
      actionMenuPosition: {
        x: null,
        y: null,
      },
    };
  }

  componentDidMount() {
    // Add a placeholder if the first block has no sibling elements and no content
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.props.html || this.props.imageUrl,
    });
    if (!hasPlaceholder) {
      this.setState({
        ...this.state,
        html: this.props.html,
        tag: this.props.tag,
        imageUrl: this.props.imageUrl,
      });
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    // update the page on the server if one of the following is true
    // 1. user stopped typing and the html content has changed & no placeholder set
    // 2. user changed the tag & no placeholder set
    // 3. user changed the image & no placeholder set
    const stoppedTyping = prevState.isTyping && !this.state.isTyping;
    const hasNoPlaceholder = !this.state.placeholder;
    const htmlChanged = this.props.html !== this.state.html;
    const tagChanged = this.props.tag !== this.state.tag;
    const imageChanged = this.props.imageUrl !== this.state.imageUrl;
    if (
      ((stoppedTyping && htmlChanged) || tagChanged || imageChanged) &&
      hasNoPlaceholder
    ) {
      this.props.updateBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
      });
    }
  }

  componentWillUnmount() {
    // In case, the user deleted the block, we need to cleanup all listeners
    document.removeEventListener("click", this.closeActionMenu, false);
  }

  handleChange(e: any) {
    this.setState({ ...this.state, html: e.target.value });
  }

  handleFocus() {
    // If a placeholder is set, we remove it when the block gets focused
    if (this.state.placeholder) {
      this.setState({
        ...this.state,
        html: "",
        placeholder: false,
        isTyping: true,
      });
    } else {
      this.setState({ ...this.state, isTyping: true });
    }
  }

  handleBlur(e: any) {
    // Show placeholder if block is still the only one and empty
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.state.html || this.state.imageUrl,
    });
    if (!hasPlaceholder) {
      this.setState({ ...this.state, isTyping: false });
    }
  }

  handleKeyDown(e: any) {
    if (e.key === CMD_KEY) {
      // If the user starts to enter a command, we store a backup copy of
      // the html. We need this to restore a clean version of the content
      // after the content type selection was finished.
      this.setState({ htmlBackup: this.state.html });
    } else if (e.key === "Backspace" && !this.state.html) {
      this.props.deleteBlock({ id: this.props.id });
    } else if (
      e.key === "Enter" &&
      this.state.previousKey !== "Shift" &&
      !this.state.tagSelectorMenuOpen
    ) {
      // If the user presses Enter, we want to add a new block
      // Only the Shift-Enter-combination should add a new paragraph,
      // i.e. Shift-Enter acts as the default enter behaviour
      e.preventDefault();
      this.props.addBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
        ref: this.contentEditable.current,
      });
    }
    // We need the previousKey to detect a Shift-Enter-combination
    this.setState({ previousKey: e.key });
  }

  // The openTagSelectorMenu function needs to be invoked on key up. Otherwise
  // the calculation of the caret coordinates does not work properly.
  handleKeyUp(e: any) {
    if (e.key === CMD_KEY) {
      this.openTagSelectorMenu("KEY_CMD");
    }
  }

  handleMouseUp() {
    const block = this.contentEditable.current;
    if (block) {
      const { selectionStart, selectionEnd } = GetSelection(block);
      if (selectionStart !== selectionEnd) {
        this.openActionMenu(block, "TEXT_SELECTION");
      }
    }
  }

  handleDragHandleClick(e: any) {
    const dragHandle = e.target;
    this.openActionMenu(dragHandle, "DRAG_HANDLE_CLICK");
  }

  openActionMenu(parent: any, trigger: any) {
    console.log("parent", parent);

    const x = this.calculateActionMenuPosition(parent, trigger)?.x;
    const y = this.calculateActionMenuPosition(parent, trigger)?.y;
    this.setState({
      ...this.state,
      actionMenuPosition: { x: x, y: y },
      actionMenuOpen: true,
    });
    // Add listener asynchronously to avoid conflicts with
    // the double click of the text selection
    setTimeout(() => {
      document.addEventListener("click", this.closeActionMenu, false);
    }, 100);
  }

  closeActionMenu() {
    this.setState({
      ...this.state,
      actionMenuPosition: { x: null, y: null },
      actionMenuOpen: false,
    });
    document.removeEventListener("click", this.closeActionMenu, false);
  }

  openTagSelectorMenu(trigger: any) {
    const { x, y } = this.calculateTagSelectorMenuPosition(trigger);
    this.setState({
      ...this.state,
      tagSelectorMenuPosition: { x: x, y: y },
      tagSelectorMenuOpen: true,
    });
    document.addEventListener("click", this.closeTagSelectorMenu, false);
  }

  closeTagSelectorMenu() {
    this.setState({
      ...this.state,
      htmlBackup: null,
      tagSelectorMenuPosition: { x: null, y: null },
      tagSelectorMenuOpen: false,
    });
    document.removeEventListener("click", this.closeTagSelectorMenu, false);
  }

  // Convert editableBlock shape based on the chosen tag
  // i.e. img = display <div><input /><img /></div> (input picker is hidden)
  // i.e. every other tag = <ContentEditable /> with its tag and html content
  handleTagSelection(tag: any) {
    if (tag === "img") {
      this.setState({ ...this.state, tag: tag }, () => {
        this.closeTagSelectorMenu();
        if (this.fileInput) {
          // Open the native file picker
          this.fileInput.click();
        }
      });
    } else {
      if (this.state.isTyping) {
        // Update the tag and restore the html backup without the command
        this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
          SetCaretToEnd(this.contentEditable.current);
          this.closeTagSelectorMenu();
        });
      } else {
        this.setState({ ...this.state, tag: tag }, () => {
          this.closeTagSelectorMenu();
        });
      }
    }
  }

  async handleImageUpload() {
    if (this.fileInput && this.fileInput.files) {
      const pageId = this.props.pageId;
      const imageFile = this.fileInput.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/pages/images?pageId=${pageId}`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );
        const data = await response.json();
        const imageUrl = data.imageUrl;
        this.setState({ ...this.state, imageUrl: imageUrl });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Show a placeholder for blank pages
  addPlaceholder({ block, position, content }: addPlaceholderProps) {
    const isFirstBlockWithoutHtml = position === 1 && !content;
    const isFirstBlockWithoutSibling = !block.parentElement.nextElementSibling;
    if (isFirstBlockWithoutHtml && isFirstBlockWithoutSibling) {
      this.setState({
        ...this.state,
        html: "Type a page title...",
        tag: "h1",
        imageUrl: "",
        placeholder: true,
        isTyping: false,
      });
      return true;
    } else {
      return false;
    }
  }

  // If we have a text selection, the action menu should be displayed above
  // If we have a drag handle click, the action menu should be displayed beside
  calculateActionMenuPosition(parent: any, initiator: any) {
    switch (initiator) {
      case "TEXT_SELECTION":
        const { x: endX } = GetCaretCoordinates(false); // fromEnd
        const { x: startX, y: startY } = GetCaretCoordinates(true); // fromStart
        if (endX && startX) {
          const middleX = startX + (endX - startX) / 2;
          return { x: middleX, y: startY };
        }
        break;

      case "DRAG_HANDLE_CLICK":
        const x =
          parent.offsetLeft - parent.scrollLeft + parent.clientLeft - 90;
        const y = parseInt(
          parent.offsetTop - parent.scrollTop + parent.clientTop + 35
        );
        return { x: x, y: y };

      default:
        return { x: null, y: null };
    }
  }

  // If the user types the "/" command, the tag selector menu should be display above
  // If it is triggered by the action menu, it should be positioned relatively to its initiator
  calculateTagSelectorMenuPosition(initiator: any) {
    switch (initiator) {
      case "KEY_CMD":
        const { x: caretLeft, y: caretTop } = GetCaretCoordinates(true);
        return { x: caretLeft, y: caretTop };
      case "ACTION_MENU":
        const { x: actionX, y: actionY } = this.state.actionMenuPosition;
        return { x: actionX - 40, y: actionY };
      default:
        return { x: null, y: null };
    }
  }

  render() {
    return (
      <>
        {this.state.tagSelectorMenuOpen && (
          <TagSelectorMenu
            position={this.state.tagSelectorMenuPosition}
            closeMenu={this.closeTagSelectorMenu}
            handleSelection={this.handleTagSelection}
          />
        )}
        {this.state.actionMenuOpen && (
          <ActionMenu
            position={this.state.actionMenuPosition}
            actions={{
              deleteBlock: () => this.props.deleteBlock({ id: this.props.id }),
              turnInto: () => this.openTagSelectorMenu("ACTION_MENU"),
            }}
          />
        )}
        <Draggable draggableId={this.props.id} index={this.props.position}>
          {(provided, snapshot) => (
            <DraggableStyled
              ref={provided.innerRef}
              className="draggable"
              {...provided.draggableProps}
            >
              <DragHandle
                role="button"
                tabIndex={0}
                className={[
                  "dragHandle",
                  this.state.isTyping ||
                  this.state.actionMenuOpen ||
                  this.state.tagSelectorMenuOpen
                    ? "blockSelected"
                    : null,
                ].join(" ")}
                onClick={this.handleDragHandleClick}
                {...provided.dragHandleProps}
              >
                <DraggalbleIcon size={20} />
              </DragHandle>
              {this.state.tag !== "img" && (
                <Block
                  innerRef={this.contentEditable}
                  data-position={this.props.position}
                  data-tag={this.state.tag}
                  html={this.state.html}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onKeyDown={this.handleKeyDown}
                  onKeyUp={this.handleKeyUp}
                  onMouseUp={this.handleMouseUp}
                  tagName={this.state.tag}
                  className={[
                    "block",
                    this.state.isTyping ||
                    this.state.actionMenuOpen ||
                    this.state.tagSelectorMenuOpen
                      ? "blockSelected"
                      : null,
                    this.state.placeholder ? "placeholder" : null,
                    // snapshot.isDragging ? styles.isDragging : null,
                  ].join(" ")}
                />
              )}
              {this.state.tag === "img" && (
                <Image
                  data-position={this.props.position}
                  data-tag={this.state.tag}
                  ref={this.contentEditable}
                  className={[
                    "image",
                    this.state.actionMenuOpen || this.state.tagSelectorMenuOpen
                      ? "blockSelected"
                      : null,
                  ].join(" ")}
                >
                  <input
                    name={this.state.tag}
                    className="fileInput"
                    type="file"
                    onChange={this.handleImageUpload}
                    ref={(ref) => (this.fileInput = ref)}
                  />
                  {this.state.imageUrl && (
                    <img
                      src={
                        this.state.imageUrl
                        //http://localhost:3000/public/images/test.png
                        // process.env.NEXT_PUBLIC_API + "/" + this.state.imageUrl
                      }
                      alt=""
                    />
                  )}
                </Image>
              )}
            </DraggableStyled>
          )}
        </Draggable>
      </>
    );
  }
}

export default EditableBlock;

const Block = styled(ContentEditable)`
  padding: 0.25rem;
  // Better support for safari
  -webkit-user-select: text;
  user-select: text;

  &.blockSelected {
    background-color: ${(props) => props.theme.uiColor.tertiary};
    outline-color: ${(props) => props.theme.uiColor.tertiary};
  }
  &.placeholder {
    color: rgba(72, 72, 72, 0.25);
  }
`;

const DraggableStyled = styled.div`
  .block {
    display: inline-block;
    width: calc(100% - 2rem);
  }
`;

const DragHandle = styled.span`
  opacity: 0;
  display: inline-block;
  width: 1rem;

  ${DraggableStyled}:hover & {
    opacity: 1;
  }
  img {
    display: block;
    margin: auto;
  }
  &.blockSelected,
  &:hover {
    opacity: 1;
  }
`;

const Image = styled.div`
  display: inline-block;
  width: calc(100% - 2rem);
  padding: 0.25rem;
  input {
    display: none;
  }
  img {
    display: block;
    max-height: 600px;
    max-width: 10%;
    margin: 0 auto;
  }
  &.blockSelected {
    opacity: 0.7;
  }
`;
