import React from "react";
import styled from "styled-components";

const SpacerFixWrapper = styled.div`
  height: 64px;
  @media (max-width: 640px) {
    display: none;
  }
`;

const SpacerFix = () => {
  return <SpacerFixWrapper> </SpacerFixWrapper>;
};

export default SpacerFix;
