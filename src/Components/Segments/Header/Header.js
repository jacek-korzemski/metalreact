import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import blacklogo from "Data/white-logo.png";

const HeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  img {
    max-height: 60px;
    width: auto;
  }
`;
const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 16;
  a,
  span {
    display: block;
    width: 100%;
    padding: 16px 0;
    color: white;
    background: black;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: black;
      background: white;
    }
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    this.props.channelsHandler();
  }
  render() {
    return (
      <>
        <HeadWrapper>
          <div className="top">
            <Link to="/">
              <img src={blacklogo} alt="logo" />
            </Link>
          </div>
        </HeadWrapper>
        <MenuWrapper>
          <span onClick={() => this.openMenu()}>
            <i className="fas fa-music"></i>
          </span>
          <Link to="/fav">
            <i className="far fa-heart"></i>
          </Link>
          <Link to="/planned">
            <i className="far fa-clock"></i>
          </Link>
          <Link to="/rev/1">
            <i className="fas fa-book-open"></i>
          </Link>
        </MenuWrapper>
      </>
    );
  }
}

export default Header;
