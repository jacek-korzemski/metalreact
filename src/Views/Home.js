import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import blacklogo from "Data/white-logo.png";
import MetaTags from "react-meta-tags";

const HomeWrapper = styled.div`
  background: white;
  .grid {
    background: black;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px 1fr 1fr;
    grid-template-areas: "logo logo" "top top" "left right";
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .logo {
    grid-area: logo;
  }

  .top {
    grid-area: top;
  }

  .left {
    grid-area: left;
  }

  .right {
    grid-area: right;
  }
  a {
    display: block;
    color: white;
    text-decoration: none;
    font-size: 64px;
    transition: all 0.3s;
    &:hover {
      color: black;
      background: white;
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
          <div className="grid">
            <div className="logo flex">
              <img src={blacklogo} alt="React Metal Music" />
            </div>
            <Link
              to="/"
              onClick={this.props.channelsHandler}
              className="top flex"
              style={{ borderBottom: "5px solid white" }}
            >
              <i className="fas fa-music"></i>
            </Link>
            <Link
              to="/"
              className="left flex"
              style={{ borderRight: "2.5px solid white" }}
            >
              <i className="far fa-newspaper"></i>
            </Link>
            <Link
              to="/"
              className="right flex"
              style={{ borderLeft: "2.5px solid white" }}
            >
              <i className="far fa-heart"></i>
            </Link>
          </div>
        </HomeWrapper>
      </>
    );
  }
}

export default Home;
