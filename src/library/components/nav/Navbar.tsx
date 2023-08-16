import React from "react";
import { styled } from "styled-components";
import COLOR from "../../_constants/colors";

interface Props {
  children?: React.ReactNode;
}
const Navbar = ({ children }: Props) => {
  return <Wrap data-testid="header-nav">{children}</Wrap>;
};

const Wrap = styled.header`
  height: 60px;
  background-color: ${COLOR.navy};
  color: ${COLOR.white};
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 18px;
`;

export default Navbar;
