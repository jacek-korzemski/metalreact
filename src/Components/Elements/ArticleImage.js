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
              backgroundRepeat: "no-repeat",
            }}
          />
        ) : (
          <Loading small />
        )}
      </ImageWrapper>
    );
  }
}

export default ArticleImage;
