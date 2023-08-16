import { styled } from "styled-components";
import COLOR from "../../_constants/colors";

const ErrorMessage = ({ children }: { children: any }) => {
  return <Message>{children}</Message>;
};
const Message = styled.div`
  color: ${COLOR.incorrect};
  font-size: 12px;
  margin: 5px;
  display: flex;
  align-items: center;
`;
export default ErrorMessage;
