import React from "react";
import styled from "styled-components";

const AppWrapperWrapper = styled.div`
  display: block;
`;

class AppWrapper extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return <AppWrapperWrapper>{this.props.children}</AppWrapperWrapper>;
  }
}

export default AppWrapper;
