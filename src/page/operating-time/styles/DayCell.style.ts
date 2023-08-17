import { styled } from "styled-components";

export const Wrap = styled.div`
  width: 350px;
  margin: 30px 50px;
  min-height: 100px;
  max-height: 350px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: rgb(255, 255, 255);
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(219, 219, 219, 0.514);
    border-radius: 10px;
    height: 10px;
  }
`;
