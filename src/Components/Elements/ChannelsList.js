import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import mrdoom666 from "Data/ChannelLogos/mrdoom666.jpg";
import atmoblackmetal from "Data/ChannelLogos/atmoblackmetal.jpg";
import bmp from "Data/ChannelLogos/bmp.jpg";
import davidTBassWolfsMusic from "Data/ChannelLogos/davidTBassWolfsMusic.jpg";
import dotdotdot from "Data/ChannelLogos/dotdotdot.jpg";
import gregbiehl from "Data/ChannelLogos/gregbiehl.jpg";
import heavyrockfreak from "Data/ChannelLogos/heavyrockfreak.jpg";
import ironblood from "Data/ChannelLogos/ironblood.jpg";
import melomanoadicto from "Data/ChannelLogos/melomanoadicto.jpg";
import mpampisflou from "Data/ChannelLogos/mpampisflou.jpg";
import mv from "Data/ChannelLogos/mv.jpg";
import mvii from "Data/ChannelLogos/mvii.jpg";
import nwoostm from "Data/ChannelLogos/nwoostm.jpg";
import odiumnostrum from "Data/ChannelLogos/odiumnostrum.jpg";
import rhammer from "Data/ChannelLogos/rhammer.jpg";
import smod from "Data/ChannelLogos/smod.jpg";
import tmc from "Data/ChannelLogos/tmc.jpg";
import unitedbyrock from "Data/ChannelLogos/unitedbyrock.jpg";
import nwothm from "Data/ChannelLogos/nwothm.jpg";

const ChannelsWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: black;
  animation: slideIn 0.3s forwards;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 999;
  &::-webkit-scrollbar-track {
    background-color: black;
    border-radius: 0;
  }
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background-color: black;
    border-radius: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 0;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex-direction: column;
    li {
      width: 100%;
      word-break: break-word;
      a {
        padding: 32px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: black;
        text-decoration: none;
        img {
          width: 25%;
          max-width: 200px;
          height: auto;
          border-radius: 50%;
        }
        span {
          padding-left: 16px;
          font-size: 20px;
          color: white;
        }
        &:hover {
          background: white;
          span {
            color: black;
          }
        }
      }
      .fa-times {
        padding: 32px 0;
        font-size: 32px;
        text-align: center;
        width: 100%;
        display: block;
        color: white;
        background: black;
        &:hover {
          color: black;
          background: white;
        }
      }
    }
  }
  &.isSlideingUp {
    animation: slideOut 0.3s forwards;
  }
`;

class ChannelsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuIsCloseing: false,
    };

    this.closeMenu = this.closeMenu.bind(this);
  }
  closeMenu() {
    this.setState({
      menuIsCloseing: true,
    });
    setTimeout(() => {
      this.closeUp();
    }, 300);
  }
  closeUp() {
    this.props.closeHandler();
  }

  render() {
    return (
      <ChannelsWrapper
        className={this.state.menuIsCloseing ? "isSlideingUp" : null}
      >
        <ul>
          <li>
            <span
              className="fa fa-times"
              onClick={this.closeMenu}
              style={{ textAlign: "center" }}
            ></span>
          </li>
          <li>
            <Link to="/mrdoom666/0" onClick={this.closeMenu}>
              <img src={mrdoom666} alt="" /> <span> 666MrDoom </span>
            </Link>
          </li>
          <li>
            <Link to="/atmoblackmetal/0" onClick={this.closeMenu}>
              <img src={atmoblackmetal} alt="" />{" "}
              <span>Atmospheric Black Metal</span>
            </Link>
          </li>
          <li>
            <Link to="/bmp/0" onClick={this.closeMenu}>
              <img src={bmp} alt="" /> <span>Black Metal Promotion </span>
            </Link>
          </li>
          <li>
            <Link to="/davidtbass/0" onClick={this.closeMenu}>
              <img src={davidTBassWolfsMusic} alt="" />{" "}
              <span>Wolf's David Music</span>
            </Link>
          </li>
          <li>
            <Link to="/dotdotdot/0" onClick={this.closeMenu}>
              <img src={dotdotdot} alt="" /> <span> Dot dot dot </span>
            </Link>
          </li>
          <li>
            <Link to="/gregbiehl/0" onClick={this.closeMenu}>
              <img src={gregbiehl} alt="" /> <span>Greg Biehl </span>
            </Link>
          </li>
          <li>
            <Link to="/heavyrockfreak/0" onClick={this.closeMenu}>
              <img src={heavyrockfreak} alt="" /> <span>HeavyRockFreak</span>
            </Link>
          </li>
          <li>
            <Link to="/ironblood/0" onClick={this.closeMenu}>
              <img src={ironblood} alt="" /> <span>Iron Blood </span>
            </Link>
          </li>
          <li>
            <Link to="/melomanoadicto/0" onClick={this.closeMenu}>
              <img src={melomanoadicto} alt="" /> <span>Melomano Adicto </span>
            </Link>
          </li>
          <li>
            <Link to="/mv/0" onClick={this.closeMenu}>
              <img src={mv} alt="" /> <span>Metal Vault</span>
            </Link>
          </li>
          <li>
            <Link to="/mv2/0" onClick={this.closeMenu}>
              <img src={mvii} alt="" /> <span>Metal Vault II</span>
            </Link>
          </li>
          <li>
            <Link to="/mpampisflou/0" onClick={this.closeMenu}>
              <img src={mpampisflou} alt="" /> <span>Mpampis Flou</span>
            </Link>
          </li>
          <li>
            <Link to="/nwoostm/0" onClick={this.closeMenu}>
              <img src={nwoostm} alt="" />{" "}
              <span>New Wave Of Old School Thrash Metal</span>
            </Link>
          </li>
          <li>
            <Link to="/nwothm/0" onClick={this.closeMenu}>
              <img src={nwothm} alt="" /> <span>NWOTHM </span>
            </Link>
          </li>
          <li>
            <Link to="/obidiumnostrum/0" onClick={this.closeMenu}>
              <img src={odiumnostrum} alt="" /> <span> ObidiumNostrum </span>
            </Link>
          </li>
          <li>
            <Link to="/rhammer/0" onClick={this.closeMenu}>
              <img src={rhammer} alt="" />{" "}
              <span>ROB HAMMER *stonerdoom*psych*sludge*grunge*metal*</span>
            </Link>
          </li>
          <li>
            <Link to="/smod/0" onClick={this.closeMenu}>
              <img src={smod} alt="" /> <span>Stoned Meadow Of Doom </span>
            </Link>
          </li>
          <li>
            <Link to="/thrashmetalcatalog/0" onClick={this.closeMenu}>
              <img src={tmc} alt="" /> <span>Thrash Metal Catalog </span>
            </Link>
          </li>
          <li>
            <Link to="/unitedbyrock/0" onClick={this.closeMenu}>
              <img src={unitedbyrock} alt="" /> <span>United by Rock </span>
            </Link>
          </li>
        </ul>
      </ChannelsWrapper>
    );
  }
}

export default ChannelsList;
