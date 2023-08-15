import React from "react";
import Icon from "../../../library/atom/icon/icon";
import { styled } from "styled-components";
import COLOR from "../../../library/_constants/colors";

interface Props {
  title: string;
  state: boolean;
  setState: (state: boolean) => void;
}

const CheckAll = ({ title, state, setState }: Props) => {
  return (
    <Wrap>
      <Icon
        onClick={() => setState(!state)}
        color={state ? "primary" : "light"}
      >
        <Icon.Check />
      </Icon>
      <p>{title}</p>
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 10px;
    font-size: 15px;
    font-weight: 400;
    color: ${COLOR.textDefault};
  }
`;
export default CheckAll;
