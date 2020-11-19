import React from "react";
import styled from "styled-components";
import { TrashIcon } from "../images/Icon";

const MENU_WIDTH = 150;
const MENU_HEIGHT = 40;

interface ActionMenuProps {
  position: any;
  actions: any;
}

const ActionMenu = ({ position, actions }: ActionMenuProps) => {
  const x = position.x - MENU_WIDTH / 2;
  const y = position.y - MENU_HEIGHT - 10;

  return (
    <MenuWrapper
      className="menuWrapper"
      style={{
        top: y,
        left: x,
      }}
    >
      <Menu className="menu">
        <MenuItem
          id="turn-into"
          className="menuItem"
          role="button"
          tabIndex={0}
          onClick={() => actions.turnInto()}
        >
          Turn into
        </MenuItem>
        <MenuItem
          id="delete"
          className="menuItem"
          role="button"
          tabIndex={0}
          onClick={() => actions.deleteBlock()}
        >
          <TrashIcon size={12} />
        </MenuItem>
      </Menu>
    </MenuWrapper>
  );
};

export default ActionMenu;

const MenuWrapper = styled.div`
  position: absolute;
  width: auto;
  height: 2.5rem;
  z-index: 11;
`;

const Menu = styled.div`
  width: auto;
  height: 100%;
  background: white;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
`;

const MenuItem = styled.span`
  width: auto;
  min-width: 4rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-family: $accent;
  font-weight: 700;
  border-right: 1px solid $secondary;
  img {
    width: 100%;
    height: 100%;
    max-width: 1rem;
    max-height: 1.125rem;
  }
  :last-of-type {
    border-right: none;
  }
  :hover {
    background: $tertiary;
    cursor: pointer;
  }
  :first-of-type:hover {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  :last-of-type:hover {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;
