import React from "react";
import styled from "styled-components";

/*
<i class="far fa-heart"></i> puste
<i class="fas fa-heart"></i> pełne
<i class="far fa-clock"></i> pusty
<i class="fas fa-clock"></i> pełny
<i class="fas fa-copy"></i> copy
*/

const TooltipWrapper = styled.div`
  position: absolute;
  top: -1px;
  left: -64px;
  width: calc(100% + 64px);
  height: 100%;
  background: transparent;
  z-index: 28;
  ul {
    position: relative;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background: white;
    position: absolute;
    right: calc(100% - 54px);
    top: -2px;
    box-shadow: 2px 2px 5px black;
    animation: fadeIn 0.3s forwards;
    display: flex;
    width: 160px;
    justify-content: space-between;
    padding: 8px 16px;
    border-radius: 8px;
    z-index: 30;
    li {
      line-height: initial;
      &.hr {
        &:hover {
          color: red;
        }
        &.active {
          color: red;
        }
      }
      &.cl {
        &:hover {
          color: blueviolet;
        }
      }
      &.cp {
        &:hover {
          color: goldenrod;
        }
      }
    }
  }
  .arrow {
    position: absolute;
    right: -30px;
    top: 15px;
    border: 15px solid transparent;
    border-left: 15px solid black;
    z-index: 32;
    &:after {
      content: "";
      display: block;
      position: absolute;
      right: -13px;
      top: -14px;
      border: 14px solid transparent;
      border-left: 14px solid white;
      z-index: 35;
    }
  }
`;

class ChannelGearTooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faves: [],
    };

    this.closeFixer = this.closeFixer.bind(this);
    this.addToFav = this.addToFav.bind(this);
    this.addToPlan = this.addToPlan.bind(this);
    this.copyUrl = this.copyUrl.bind(this);
    this.loadFaves = this.loadFaves.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.closeFixer, true);
    this.loadFaves();
  }

  loadFaves() {
    if (!localStorage.getItem("fav")) {
      return [];
    } else {
      let a = JSON.parse(localStorage.getItem("fav"));
      let b = [];
      for (let i = 0; i < a.fav.length; i++) {
        b.push(a.fav[i].id);
      }
      this.setState({
        faves: b,
      });
    }
  }

  closeFixer() {
    setTimeout(() => {
      document.removeEventListener("click", this.closeFixer, true);
      this.props.closeHandler();
    }, 45);
  }
  addToFav() {
    if (!localStorage.getItem("fav")) {
      localStorage.setItem(
        "fav",
        '{"fav": [{"channel":"' +
          this.props.channel +
          '", "id":"' +
          this.props.id +
          '"}]}'
      );
    } else {
      let arr = JSON.parse(localStorage.getItem("fav"));
      let newItem = { channel: this.props.channel, id: this.props.id };
      arr.fav.push(newItem);
      localStorage.setItem("fav", JSON.stringify(arr));
    }
  }
  addToPlan() {}
  copyUrl() {}
  render() {
    return (
      <TooltipWrapper onMouseLeave={this.closeFixer}>
        <ul>
          <div className="arrow"></div>
          <li
            className={
              this.state.faves.includes(this.props.id) ? "hr active" : "hr"
            }
            onClick={this.addToFav}
          >
            {this.state.faves.includes(this.props.id) ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </li>
          <li className="cl" onClick={this.addToPlan}>
            <i className="far fa-clock"></i>
          </li>
          <li className="cp" onClick={this.copyUrl}>
            <i className="fas fa-copy"></i>
          </li>
        </ul>
      </TooltipWrapper>
    );
  }
}

export default ChannelGearTooltip;
