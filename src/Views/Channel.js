import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "Components/Elements/Loading";
import { withRouter } from "react-router-dom";
import Player from "Components/Segments/Player/Player";

const ChannelWrapper = styled.div`
  max-width: 1400px;
  min-height: calc(100vh - 64px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h1,
  h2 {
    margin: 0;
    text-align: center;
    width: 100%;
  }
  h1 {
    margin-top: 16px;
  }
  h2 {
    margin-bottom: 16px;
  }
  .elements {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    .element {
      margin: 0.45%;
      width: 24%;
      cursor: pointer;
      .image {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        width: 100%;
        overflow: hidden;
        img {
          display: block;
          height: 100%;
          width: auto;
        }
      }
      .title {
        font-size: 20px;
        text-align: center;
      }
      @media (max-width: 1280px) {
        width: 49%;
      }
      @media (max-width: 640px) {
        width: 100%;
      }
      &:hover {
        .title {
          color: red;
        }
      }
    }
    a {
      color: black;
      text-decoration: none;
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

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      data: null,
      chunk: null,
      nowPlaying: false,
    };

    this.loadData = this.loadData.bind(this);
    this.chunkData = this.chunkData.bind(this);
    this.startAlbum = this.startAlbum.bind(this);
    this.closePlayer = this.closePlayer.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state || nextProps !== this.props) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.channel !== this.props.match.params.channel) {
      this.loadData();
    }
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.chunkData(this.props.match.params.page);
    }
    if (prevProps.match.params.album !== this.props.match.params.album) {
      this.startAlbum(this.props.match.params.album);
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(withTrack) {
    this.setState({
      ready: false,
    });
    console.log(
      "http://katalog.metalmusic.pl/" +
        this.props.match.params.channel +
        "/getjson/0"
    );
    fetch(
      "http://katalog.metalmusic.pl/" +
        this.props.match.params.channel +
        "/getjson/0"
    )
      .then((res) => {
        if (!res.ok) {
          console.log("jebło");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        res.videos = Object.values(res.videos);
        res.videos.reverse();
        this.setState({
          data: res,
          ready: true,
        });
        if (this.props.match.params.album) {
          this.startAlbum(this.props.match.params.album);
        }
      })
      .then(() => {
        this.chunkData(parseInt(this.props.match.params.page));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  chunkData(num, track) {
    let newarr = this.state.data.videos;
    newarr = newarr.slice(num * 32, num * 32 + 32);
    this.setState({
      chunk: newarr,
    });
  }

  startAlbum(vidId) {
    if (this.state.data) {
      for (let x = 0; x < this.state.data.videos.length; x++) {
        if (this.state.data.videos[x].list_videoId === vidId) {
          this.setState({
            nowPlaying: {
              href: this.state.data.videos[x].list_videoLink,
              title: this.state.data.videos[x].list_videoTitle,
            },
          });
        }
      }
    }
  }

  closePlayer() {
    this.setState({
      nowPlaying: false,
    });
  }

  render() {
    return (
      <>
        {this.state.ready ? (
          <ChannelWrapper>
            <h1> {this.state.data.title} </h1>
            <div className="elements">
              <div className="pagination">
                {parseInt(this.props.match.params.page) !== 0 && (
                  <Link
                    to={
                      "/" +
                      this.props.match.params.channel +
                      "/" +
                      (parseInt(this.props.match.params.page) - 1)
                    }
                  >
                    <span className="fa fa-angle-left"></span>
                  </Link>
                )}
                {this.state.chunk && this.state.chunk.length > 0 && (
                  <Link
                    to={
                      "/" +
                      this.props.match.params.channel +
                      "/" +
                      (parseInt(this.props.match.params.page) + 1)
                    }
                  >
                    <span className="fa fa-angle-right"></span>
                  </Link>
                )}
              </div>
              {this.state.chunk &&
                this.state.chunk.map((element, index) => (
                  <Link
                    className="element"
                    key={index}
                    to={
                      "/" +
                      this.props.match.params.channel +
                      "/" +
                      this.props.match.params.page +
                      "/" +
                      element.list_videoId
                    }
                  >
                    <div className="image">
                      <img
                        src={element.list_videoImage}
                        alt={element.list_videoTitle}
                      />
                    </div>
                    <div className="title">{element.list_videoTitle}</div>
                  </Link>
                ))}
            </div>
            {parseInt(this.props.match.params.page) !== 0 &&
              this.state.chunk &&
              this.state.chunk.length === 0 && (
                <h1>Doszedłeś do końca, nie ma więcej metalu tutaj :(</h1>
              )}
            <div className="pagination">
              {parseInt(this.props.match.params.page) !== 0 && (
                <Link
                  to={
                    "/" +
                    this.props.match.params.channel +
                    "/" +
                    (parseInt(this.props.match.params.page) - 1)
                  }
                >
                  <span className="fa fa-angle-left"></span>
                </Link>
              )}
              {this.state.chunk && this.state.chunk.length > 0 && (
                <Link
                  to={
                    "/" +
                    this.props.match.params.channel +
                    "/" +
                    (parseInt(this.props.match.params.page) + 1)
                  }
                >
                  <span className="fa fa-angle-right"></span>
                </Link>
              )}
            </div>
            {this.state.nowPlaying && (
              <Player
                track={this.state.nowPlaying}
                closeHandler={this.closePlayer}
                returnHandler={
                  "/" +
                  this.props.match.params.channel +
                  "/" +
                  this.props.match.params.page
                }
                nextHandler={
                  "/" +
                  this.props.match.params.channel +
                  "/" +
                  this.props.match.params.page +
                  "/" +
                  parseInt(this.props.match.params.album - -1)
                }
                prevHandler={
                  "/" +
                  this.props.match.params.channel +
                  "/" +
                  this.props.match.params.page +
                  "/" +
                  parseInt(this.props.match.params.album - 1)
                }
              />
            )}
          </ChannelWrapper>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default withRouter(Channel);
