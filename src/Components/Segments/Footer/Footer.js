import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  padding: 4px 0;
  background: black;
  color: white;
  text-align: center;
  position: absolute;
  bottom: 0;
  p {
    margin: 0;
  }
  .blue {
    color: lightblue;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        Proudly created in <span className="blue">REACT</span> by{" "}
        <span className="blue">Jacek Korzemski</span>
      </p>
    </FooterWrapper>
  );
};

export default Footer;
