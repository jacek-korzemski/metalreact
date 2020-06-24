import React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: inline-block;
    font-size: 120px;
    animation: rotateInfinite 2s linear infinite;
    color: black;
  }
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <span className="fa fa-cog"></span>
    </LoadingWrapper>
  );
};

export default Loading;
