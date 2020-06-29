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
    height: calc(100vh - 420px);
    max-width: 1400px;
    margin-bottom: 32px;
  }
  .pagination-player {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin: 0 16px;
      display: block;
      font-size: 64px;
      color: white;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: red;
      }
    }
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
      <iframe
        src={href}
        title={props.track.title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder={0}
      ></iframe>
      <h2>{props.track.title}</h2>
      <div className="pagination-player">
        <Link to={props.nextHandler}>
          <span className="fa fa-angle-left"></span>
        </Link>
        <Link to={props.returnHandler}>
          <span className="close" onClick={() => props.closeHandler()}>
            X
          </span>
        </Link>
        <Link to={props.prevHandler}>
          <span className="fa fa-angle-right"></span>
        </Link>
      </div>
    </PlayerWrapper>
  );
};

export default Player;
