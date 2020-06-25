import React from "react";
import styled from "styled-components";
import Loading from "Components/Elements/Loading";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import ArticleImage from "Components/Elements/ArticleImage";

const ReviewWrapper = styled.div`
  min-height: calc(100vh - 64px);
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 64px;
  figure {
    margin: 0 auto;
    padding: 16px 0;
    text-align: center;
  }
  @media (max-width: 640px) {
    min-height: calc(100vh - 128px);
  }
  .elements {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
    a {
      display: block;
      width: 24%;
      margin: 16px 0.5%;
      color: black;
      text-decoration: none;
      &:hover {
        color: red;
      }
    }
  }
`;

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      content: false,
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.page) {
      this.loadData(parseInt(this.props.match.params.page));
    } else {
      this.loadData(1);
    }
  }

  loadData(page) {
    fetch(
      "http://metalmusic.pl/wp-json/wp/v2/posts?page=" + page + "&per_page=16"
    )
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
          <ReviewWrapper>
            <div className="elements">
              {this.state.content && (
                <>
                  {this.state.content.map((elem, index) => (
                    <Link to={"/art-" + elem.id + "/" + elem.slug} key={index}>
                      <ArticleImage
                        href={elem["_links"]["wp:featuredmedia"][0].href}
                        alt={ReactHtmlParser(elem.title.rendered)}
                      />
                      <h2>{ReactHtmlParser(elem.title.rendered)}</h2>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </ReviewWrapper>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default Reviews;
