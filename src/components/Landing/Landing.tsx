import React, {useEffect} from "react";
import styled from "styled-components";
import HowTo from "./sections/HowTo";
import RecentStore from "./sections/RecentStore";

function Landing() {
  return (
    <Box>
      <RecentStore />
      <HowTo />
    </Box>
  );
}

export default Landing;

const Box = styled.div`
  width: 1300px;
  margin: 0 auto;
`;
