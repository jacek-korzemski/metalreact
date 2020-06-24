import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PlayerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: slideIn 0.3s forwards;
  z-index: 128;
  user-select: none;
  h2 {
    margin-top: 16px;
    color: white;
    user-select: none;
  }
  iframe {
    width: 100%;
    height: calc(100vh - 320px);
  }
  span.close {
    font-size: 64px;
    color: white;
    cursor: pointer;
    user-select: none;
  }
  a {
    color: white;
    text-decoration: none;
  }
`;

const Player = (props) => {
  let href = props.track.href;
  href = href.replace("watch?v=", "embed/");
  return (
    <PlayerWrapper>
      <Link to={props.returnHandler}>
        <span className="close" onClick={() => props.closeHandler()}>
          X
        </span>
      </Link>
      <iframe
        src={href}
        title={props.track.title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        frameBorder={0}
      ></iframe>
      <h2>{props.track.title}</h2>
    </PlayerWrapper>
  );
};

export default Player;
