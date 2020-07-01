import React from "react";
import styled from "styled-components";
import ChannelGearTooltip from "Components/Elements/ChannelGearTooltip";
import { Link } from "react-router-dom";

const ElementWrapper = styled.div`
  width: calc(25% - 16px);
  margin: 16px 8px;
  @media (max-width: 1024px) {
    width: calc(50% - 16px);
  }
  @media (max-width: 640px) {
    width: calc(100% - 16px);
  }
  .top {
    display: block;
    height: 250px;
    position: relative;
  }
  .gearHandler,
  .playerHandler {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 50px;
    height: 50px;
    line-height: 54px;
    text-align: center;
    font-size: 36px;
    background: white;
    color: black;
    box-shadow: 2px 2px 5px black;
    border-radius: 8px;
    cursor: pointer;
  }
  .playerHandler {
    display: block;
    right: initial;
    left: 4px;
    font-size: 28px;
    color: black;
    text-decoration: none;
  }
  .left {
    a {
      display: block;
      color: black;
      padding: 16px 8px;
      text-align: center;
    }
  }
`;

class ListElementVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openedTooltip: false,
    };

    this.openTooltip = this.openTooltip.bind(this);
    this.closeTooltip = this.closeTooltip.bind(this);
  }

  openTooltip() {
    this.setState({
      openedTooltip: true,
    });
    document.addEventListener("click", this.closeTooltip, true);
  }
  closeTooltip() {
    setTimeout(() => {
      this.setState({
        openedTooltip: false,
      });
    }, 45);
    document.removeEventListener("click", this.closeTooltip, true);
  }

  render() {
    return (
      <ElementWrapper>
        <div
          to={"/" + this.props.chanel + "/" + this.props.id}
          className="top"
          style={{
            background: "url('" + this.props.img + "')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="gearHandler" onClick={this.openTooltip}>
            <span className="fas fa-cog"></span>
            {this.state.openedTooltip && (
              <>
                <ChannelGearTooltip
                  id={this.props.id}
                  channel={this.props.channel}
                  closeHandler={this.closeTooltip}
                />
              </>
            )}
          </div>
          <Link
            className="playerHandler"
            to={"/" + this.props.channel + "/" + this.props.id}
          >
            <span className="fas fa-play"></span>
          </Link>
        </div>
        <div className="left">
          <Link to={"/" + this.props.channel + "/" + this.props.id}>
            {this.props.title}
          </Link>
        </div>
      </ElementWrapper>
    );
  }
}

export default ListElementVideo;
