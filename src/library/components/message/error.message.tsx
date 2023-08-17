import { styled } from "styled-components";
import COLOR from "../../_constants/colors";

interface Props {
  children: any;
  dataTestId?: string;
}

const ErrorMessage = ({ children, dataTestId = "error-message" }: Props) => {
  return (
    <>{children && <Message data-testid={dataTestId}>{children}</Message>}</>
  );
};
const Message = styled.div`
  color: ${COLOR.incorrect};
  font-size: 12px;
  margin: 5px;
  display: flex;
  align-items: center;
`;
export default ErrorMessage;
