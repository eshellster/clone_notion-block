import React, { useState, useEffect } from "react";
import { matchSorter } from "match-sorter";
import styled from "styled-components";

const MENU_HEIGHT = 150;
const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "Page Title",
  },
  {
    id: "heading",
    tag: "h2",
    label: "Heading",
  },
  {
    id: "subheading",
    tag: "h3",
    label: "Subheading",
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph",
  },
  {
    id: "image",
    tag: "img",
    label: "Image",
  },
];

interface TagSelectorMenuProps {
  position: any;
  closeMenu: any;
  handleSelection: any;
}

const TagSelectorMenu = ({
  position,
  closeMenu,
  handleSelection,
}: TagSelectorMenuProps) => {
  const [tagList, setTagList] = useState(allowedTags);
  const [selectedTag, setSelectedTag] = useState(0);
  const [command, setCommand] = useState("");

  // If the tag selector menu is display outside the top viewport,
  // we display it below the block
  const isMenuOutsideOfTopViewport = position.y - MENU_HEIGHT < 0;
  const y = !isMenuOutsideOfTopViewport
    ? position.y - MENU_HEIGHT
    : position.y + MENU_HEIGHT / 3;
  const x = position.x;

  // Filter tagList based on given command
  useEffect(() => {
    setTagList(matchSorter(allowedTags, command, { keys: ["tag"] }));
  }, [command]);

  // Attach listener to allow tag selection via keyboard
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSelection(tagList[selectedTag].tag);
      } else if (e.key === "Tab" || e.key === "ArrowDown") {
        e.preventDefault();
        const newSelectedTag =
          selectedTag === tagList.length - 1 ? 0 : selectedTag + 1;
        setSelectedTag(newSelectedTag);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const newSelectedTag =
          selectedTag === 0 ? tagList.length - 1 : selectedTag - 1;
        setSelectedTag(newSelectedTag);
      } else if (e.key === "Backspace") {
        if (command) {
          setCommand(command.slice(0, -1));
        } else {
          closeMenu();
        }
      } else {
        setCommand(command + e.key);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [tagList, selectedTag, handleSelection, closeMenu, command]);

  return (
    <MenuWraper
      className="menuWrapper"
      style={{
        top: y,
        left: x,
        justifyContent: !isMenuOutsideOfTopViewport ? "flex-end" : "flex-start",
      }}
    >
      <Menu className="menu">
        {tagList.map((tag, key) => {
          return (
            <div
              key={key}
              data-tag={tag.tag}
              className={
                tagList.indexOf(tag) === selectedTag
                  ? ["item", "selectedTag"].join(" ")
                  : "item"
              }
              role="button"
              tabIndex={0}
              onClick={() => handleSelection(tag.tag)}
            >
              {tag.label}
            </div>
          );
        })}
      </Menu>
    </MenuWraper>
  );
};

export default TagSelectorMenu;

const MenuWraper = styled.div`
  position: absolute;
  width: 6.875rem;
  height: 9rem;
  z-index: 11;
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  background: white;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 0.5rem;
`;
