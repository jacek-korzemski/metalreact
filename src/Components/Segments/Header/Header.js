import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import blacklogo from "Data/white-logo.png";

const HeadWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  background: black;
  max-height: 64px;
  z-index: 101;
  @media (max-width: 640px) {
    max-height: 128px;
    min-height: 128px;
  }
  img {
    max-height: 64px;
    width: auto;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    .right {
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          padding: 8px;
          color: white;
          cursor: pointer;
          &:hover {
            color: red;
          }
          a {
            color: white;
            text-decoration: none;
            &:hover {
              color: red;
            }
          }
        }
      }
    }
    @media (max-width: 640px) {
      flex-direction: column;
    }
  }
`;

const ChannelsWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 64px;
  left: 0;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideIn 0.3s forwards;
  z-index: 100;
  @media (max-width: 640px) {
    top: 128px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1400px;
    li {
      display: block;
      a {
        display: block;
        padding: 12px;
        background: black;
        color: white;
        text-decoration: none;
        font-size: 16px;
        &:hover {
          color: red;
        }
      }
    }
  }
  &.isSlideingUp {
    animation: slideOut 0.3s forwards;
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subMenu: false,
      menuIsCloseing: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu() {
    this.setState({
      subMenu: true,
    });
    document.addEventListener("click", this.closeMenu, true);
  }

  closeMenu() {
    this.setState({
      menuIsCloseing: true,
    });
    setTimeout(() => {
      this.setState({
        subMenu: false,
        menuIsCloseing: false,
      });
    }, 300);
    document.removeEventListener("click", this.closeMenu, true);
  }

  render() {
    return (
      <>
        <HeadWrapper>
          <div className="container">
            <div className="left">
              <Link to="/">
                <img src={blacklogo} alt="logo" />
              </Link>
            </div>
            <div className="right">
              <ul>
                <li>
                  <Link to="/">Strona główna</Link>
                </li>
                <li onClick={this.state.subMenu ? false : this.showMenu}>
                  Kanały{" "}
                  {this.state.subMenu ? (
                    <span className="fa fa-angle-up"></span>
                  ) : (
                    <span className="fa fa-angle-down"></span>
                  )}
                </li>
                <li>
                  <Link to="/rev">Recenzje</Link>
                </li>
                <li>
                  <Link to="/Kontakt">Kontakt</Link>
                </li>
              </ul>
            </div>
          </div>
        </HeadWrapper>
        {this.state.subMenu && (
          <ChannelsWrapper
            className={this.state.menuIsCloseing ? "isSlideingUp" : null}
          >
            <ul>
              <li>
                <Link to="/mrdoom666/0" onClick={this.closeMenu}>
                  666MrDoom
                </Link>
              </li>
              <li>
                <Link to="/atmoblackmetal/0" onClick={this.closeMenu}>
                  Atmospheric Black Metal
                </Link>
              </li>
              <li>
                <Link to="/bmp/0" onClick={this.closeMenu}>
                  Black Metal Promotion 
                </Link>
              </li>
              <li>
                <Link to="/davidtbass/0" onClick={this.closeMenu}>
                  Davit T Bass
                </Link>
              </li>
              <li>
                <Link to="/dotdotdot/0" onClick={this.closeMenu}>
                  Dot dot dot 
                </Link>
              </li>
              <li>
                <Link to="/gregbiehl/0" onClick={this.closeMenu}>
                  Greg Biehl 
                </Link>
              </li>
              <li>
                <Link to="/heavyrockfreak/0" onClick={this.closeMenu}>
                  HeavyRockFreak
                </Link>
              </li>
              <li>
                <Link to="/ironblood/0" onClick={this.closeMenu}>
                  Iron Blood 
                </Link>
              </li>
              <li>
                <Link to="/melomanoadicto/0" onClick={this.closeMenu}>
                  Melomano Adicto 
                </Link>
              </li>
              <li>
                <Link to="/mv/0" onClick={this.closeMenu}>
                  Metal Vault
                </Link>
              </li>
              <li>
                <Link to="/mv2/0" onClick={this.closeMenu}>
                  Metal Vault II
                </Link>
              </li>
              <li>
                <Link to="/mpampisflou/0" onClick={this.closeMenu}>
                  Mpampis Flou
                </Link>
              </li>
              <li>
                <Link to="/nwoostm/0" onClick={this.closeMenu}>
                  New Wave Of Old School Thrash Metal
                </Link>
              </li>
              <li>
                <Link to="/nwothm/0" onClick={this.closeMenu}>
                  NWOTHM 
                </Link>
              </li>
              <li>
                <Link to="/obidiumnostrum/0" onClick={this.closeMenu}>
                  ObidiumNostrum 
                </Link>
              </li>
              <li>
                <Link to="/rhammer/0" onClick={this.closeMenu}>
                  ROB HAMMER *stonerdoom*psych*sludge*grunge*metal*
                </Link>
              </li>
              <li>
                <Link to="/smod/0" onClick={this.closeMenu}>
                  Stoned Meadow Of Doom 
                </Link>
              </li>
              <li>
                <Link to="/thrashmetalcatalog/0" onClick={this.closeMenu}>
                  Thrash Metal Catalog 
                </Link>
              </li>
              <li>
                <Link to="/unitedbyrock/0" onClick={this.closeMenu}>
                  United by Rock 
                </Link>
              </li>
            </ul>
          </ChannelsWrapper>
        )}
      </>
    );
  }
}

export default Header;
