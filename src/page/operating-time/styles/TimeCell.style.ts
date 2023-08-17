import { styled } from "styled-components";
import COLOR from "../../../library/_constants/colors";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  height: 90px;
`;

export const TimeCellWrap = styled.div`
  display: flex;
  align-items: center;
  width: 270px;
  padding: 10px;
  background-color: ${COLOR.main};
`;
