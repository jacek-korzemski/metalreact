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
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 30px;
    a {
      display: block;
      font-size: 64px;
      margin: 0 16px;
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
      lastPage: false,
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      if (isNaN(this.props.match.params.page)) {
        this.loadData(1);
      } else {
        this.loadData(parseInt(this.props.match.params.page));
      }
    }
  }

  componentDidMount() {
    if (this.props.match.params.page) {
      this.loadData(parseInt(this.props.match.params.page));
    } else {
      this.loadData(1);
    }
  }

  loadData(page) {
    this.setState({ ready: false, lastPage: false });
    fetch(
      "http://metalmusic.pl/wp-json/wp/v2/posts?page=" + page + "&per_page=16"
    )
      .then((res) => {
        if (!res.ok) {
          this.setState({
            lastPage: true,
          });
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
            <div className="pagination">
              {this.props.match.params.page &&
                parseInt(this.props.match.params.page) !== 1 && (
                  <Link
                    to={"/rev/" + (parseInt(this.props.match.params.page) - 1)}
                  >
                    <span className="fa fa-angle-left"></span>
                  </Link>
                )}
              {!this.state.lastPage && (
                <Link
                  to={
                    this.props.match.params.page
                      ? "/rev/" + (parseInt(this.props.match.params.page) + 1)
                      : "/rev/2"
                  }
                >
                  <span className="fa fa-angle-right"></span>
                </Link>
              )}
            </div>
            {this.state.lastPage && (
              <h2
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "32px",
                }}
              >
                To już ostatnia strona, dalej nie ma żadnej treści :(
              </h2>
            )}
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
            <div className="pagination">
              {this.props.match.params.page && (
                <Link
                  to={"/rev/" + (parseInt(this.props.match.params.page) - 1)}
                >
                  <span className="fa fa-angle-left"></span>
                </Link>
              )}
              {!this.state.lastPage && (
                <Link
                  to={
                    this.props.match.params.page
                      ? "/rev/" + (parseInt(this.props.match.params.page) + 1)
                      : "/rev/2"
                  }
                >
                  <span className="fa fa-angle-right"></span>
                </Link>
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
