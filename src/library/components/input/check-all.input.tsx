import Icon from "../icon/icon";
import { styled } from "styled-components";
import COLOR from "../../_constants/colors";

interface Props {
  title: string;
  state: boolean;
  setState: (state: boolean) => void;
}

const CheckAll = ({ title, state, setState }: Props) => {
  return (
    <Wrap>
      <Icon.Check
        onClick={() => setState(!state)}
        color={state ? "primary" : "light"}
      />
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
