import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";

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

const testFav = (channel, id) => {
  if (localStorage.getItem("fav")) {
    let json = JSON.parse(localStorage.getItem("fav"));
    if (json.fav.length && json.fav.length !== 0) {
      for (let i = 0; i < json.fav.length; i++) {
        console.log("json kanał " + json.fav[i].channel);
        console.log("store kanał " + channel);
        console.log("json id " + json.fav[i].id);
        console.log("store id " + id);
        if (json.fav[i].channel === channel && json.fav[i].id === id) {
          console.log("tak");
          return true;
        }
      }
    } else {
      console.log("nie");
      return false;
    }
  } else {
    console.log("nie");
    return false;
  }
};

function useForceUpdate() {
  // eslint-disable-next-line
  const [value, setValue] = useState(0);
  return () => setValue((value) => ++value);
}

function Player(props) {
  let href = props.track.href;
  href = href.replace("watch?v=", "embed/");

  const forceUpdate = useForceUpdate();

  const addToFav = (channel, id) => {
    if (!localStorage.getItem("fav")) {
      localStorage.setItem(
        "fav",
        '{"fav": [{"channel":"' + channel + '", "id":"' + id + '"}]}'
      );
    } else {
      let arr = JSON.parse(localStorage.getItem("fav"));
      let newItem = { channel: channel, id: id };
      arr.fav.push(newItem);
      localStorage.setItem("fav", JSON.stringify(arr));
    }
  };

  const removeFromFav = (id) => {
    let arr = JSON.parse(localStorage.getItem("fav")).fav;
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id !== id) {
        newArr.push(arr[i]);
      }
    }
    localStorage.setItem("fav", JSON.stringify({ fav: newArr }));
  };

  return (
    <PlayerWrapper>
      <MetaTags>
        <title>{props.track.title}</title>
      </MetaTags>
      <iframe
        src={href}
        title={props.track.title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder={0}
      ></iframe>
      <h2>{props.track.title}</h2>
      <div className="pagination-player">
        {props.prevHandler && (
          <Link to={props.prevHandler}>
            <span className="fa fa-angle-left"></span>
          </Link>
        )}
        {props.favHandler && (
          <>
            {testFav(props.track.channel, props.track.id) ? (
              <span
                className="fas fa-heart"
                onClick={() => {
                  removeFromFav(props.track.id);
                  forceUpdate();
                }}
              ></span>
            ) : (
              <span
                className="far fa-heart"
                onClick={() => {
                  addToFav(props.track.channel, props.track.id);
                  forceUpdate();
                }}
              ></span>
            )}
            {/* <span className="far fa-heart"></span> */}
          </>
        )}
        <Link to={props.returnHandler}>
          <span className="close" onClick={() => props.closeHandler()}>
            X
          </span>
        </Link>
        {props.nextHandler && (
          <Link to={props.prevHandler}>
            <span className="fa fa-angle-right"></span>
          </Link>
        )}
      </div>
    </PlayerWrapper>
  );
}

export default Player;
