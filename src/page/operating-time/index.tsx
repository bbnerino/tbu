import { styled } from "styled-components";
import COLOR from "../../library/_constants/colors";
import Navbar from "../../library/components/nav/Navbar";
import DurationForm from "./components/DurationForm";

const OperatingTimePage = () => {
  return (
    <Wrap>
      <Navbar>운영 시간</Navbar>
      <DurationForm />
    </Wrap>
  );
};

const Wrap = styled.section`
  background-color: ${COLOR.background};
  min-height: 100vh;
`;

export default OperatingTimePage;
