import React from "react";
import styled from "styled-components";
import Loading from "Components/Elements/Loading";
import ReactHtmlParser from "react-html-parser";

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .image {
    width: 100%;
    height: 100%;
    display: block;
  }
  .blank {
    width: 100%;
    height: 100%;
    display: block;
    background: black;
  }
`;

class ArticleImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      image: false,
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch(this.props.href)
      .then((res) => {
        if (!res.ok) {
          console.log("jebło");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        this.setState({
          ready: true,
          image: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <ImageWrapper>
        {this.state.ready ? (
          <>
            {this.state.image &&
            this.state.image.media_details &&
            this.state.image.media_details.sizes &&
            this.state.image.media_details.sizes.medium &&
            this.state.image.media_details.sizes.medium.source_url ? (
              <div
                className="image"
                style={{
                  background:
                    'url("' +
                    ReactHtmlParser(
                      this.state.image.media_details.sizes.medium.source_url
                    ) +
                    '")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ) : (
              <div className="blank"></div>
            )}
          </>
        ) : (
          <Loading small />
        )}
      </ImageWrapper>
    );
  }
}

export default ArticleImage;
