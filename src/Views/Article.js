import React from "react";
import styled from "styled-components";
import Loading from "Components/Elements/Loading";
import ReactHtmlParser from "react-html-parser";

const ArticleWrapper = styled.div`
  min-height: calc(100vh - 64px);
  max-width: 960px;
  padding: 0 16px;
  margin: 0 auto;
  padding-bottom: 64px;
  font-size: 24px;
  figure {
    img {
      width: 100%;
      height: auto;
    }
  }
`;

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      content: false,
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.loadData(this.props.match.params.id);
  }

  loadData(id) {
    fetch("http://metalmusic.pl/wp-json/wp/v2/posts/" + id)
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
          content: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        {this.state.ready ? (
          <ArticleWrapper>
            <h1>{ReactHtmlParser(this.state.content.title.rendered)}</h1>
            <div className="content">
              {ReactHtmlParser(this.state.content.content.rendered)}
            </div>
          </ArticleWrapper>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default Article;
