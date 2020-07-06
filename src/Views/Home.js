import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";

const HomeWrapper = styled.div`
  background: white;

  .grid-container {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background: white;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 5px 5px;
    grid-template-areas: "top-left top-right" "bottom-left bottom-right";
  }

  .top-left {
    grid-area: top-left;
  }

  .top-right {
    grid-area: top-right;
  }

  .bottom-left {
    grid-area: bottom-left;
  }

  .bottom-right {
    grid-area: bottom-right;
  }
  .top-left,
  .top-right,
  .bottom-left,
  .bottom-right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    background: black;
    cursor: pointer;
    text-decoration: none;
    font-size: 64px;
    transition: all 0.3s;
    &:hover {
      background: white;
      color: black;
    }
  }
  .fas.fa-fist-raised {
    position: fixed;
    display: block;
    top: -94px;
    left: calc(50% - 81.5px);
    padding: 64px;
    font-size: 42px;
    color: white;
    background: black;
    border: 5px solid white;
    z-index: 99;
    transform: rotate(45deg);
    &:before {
      display: inline-block;
      transform: rotate(-45deg) translate(0, 44px);
    }
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <>
        <MetaTags>
          <title>
            React.Metalmusic.pl - Twój podziemny metal w jednym miejscu!
          </title>
          <meta
            id="meta-description"
            name="description"
            content="Pełne albumy kolekcjonowane na bieżąco z 19 kanałów na youtube, artykuły z metalmusic.pl, możliwość przechowywania swoich ulubionych albumów w pamięci przeglądarki. To wszystko znajdziesz tutaj."
          />
        </MetaTags>
        <HomeWrapper>
          <div className="grid-container">
            <Link className="top-left" onClick={this.props.channelsHandler}>
              <span className="fa fa-music"></span>
            </Link>
            <Link className="top-right" to="/fav">
              <span className="fa fa-heart"></span>
            </Link>
            <Link className="bottom-left" to="/search">
              <span className="fas fa-search"></span>
            </Link>
            <Link className="bottom-right" to="/rev/1">
              <span className="fas fa-book-open"></span>
            </Link>
          </div>
          <span className="fas fa-fist-raised"></span>
        </HomeWrapper>
      </>
    );
  }
}

export default Home;
