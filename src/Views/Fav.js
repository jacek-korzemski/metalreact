import React from "react";
import styled from "styled-components";
import Header from "Components/Segments/Header/Header";
import FavListElementVideo from "Components/Elements/FavListElementVideo";
import Loading from "Components/Elements/Loading";
import Player from "Components/Segments/Player/Player";

const FavWrapper = styled.div`
  max-width: 1400px;
  margin: 32px auto 16px auto;
  text-align: center;
  .elements {
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    flex-wrap: wrap;
  }
`;

class Fav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preData: false,
      data: false,
      empty: false,
    };

    this.openMenu = this.openMenu.bind(this);
    this.compileFromStorage = this.compileFromStorage.bind(this);
    this.loadFavs = this.loadFavs.bind(this);
    this.loadPlayer = this.loadPlayer.bind(this);
    this.closePlayer = this.closePlayer.bind(this);
  }

  componentDidMount() {
    // first compile json from localstorage to array of items
    this.compileFromStorage();
    if (
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.channel &&
      this.props.match.params.id
    ) {
      this.loadPlayer(
        this.props.match.params.channel,
        this.props.match.params.id
      );
    }
  }

  componentDidUpdate() {
    if (
      this.props.match.params.channel &&
      this.props.match.params.id &&
      !this.state.nowPlaying
    ) {
      this.loadPlayer(
        this.props.match.params.channel,
        this.props.match.params.id
      );
    }
  }

  compileFromStorage() {
    if (
      !localStorage.getItem("fav") ||
      JSON.parse(localStorage.getItem("fav")).fav.length === 0
    ) {
      this.setState({
        empty: true,
      });
    } else {
      let json = JSON.parse(localStorage.getItem("fav"));
      this.setState({
        preData: json,
      });
      if (this.state.preData) {
        this.loadFavs();
      } else {
        setTimeout(() => {
          this.loadFavs();
        }, 5);
      }
    }
  }

  async loadFavs() {
    let arr = [];
    let max = this.state.preData.fav.length;
    for (let i = 0; i < this.state.preData.fav.length; i++) {
      const response = await fetch(
        "http://katalog.metalmusic.pl/single/getsingle/" +
          this.state.preData.fav[i].channel +
          "/" +
          this.state.preData.fav[i].id
      );
      const json = await response.json();
      json[0].channel = this.state.preData.fav[i].channel;
      let compiledJson = json[0];
      arr.push(compiledJson);
      if (arr.length === max) {
        arr.reverse();
        this.setState({
          data: arr,
        });
      }
    }
  }

  loadPlayer(channel, id) {
    fetch("http://katalog.metalmusic.pl/single/getsingle/" + channel + "/" + id)
      .then((res) => {
        if (!res.ok) {
          console.log("jebło przy playerze");
        } else {
          return res;
        }
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return (res = res[0]);
      })
      .then((res) => {
        this.setState({
          nowPlaying: {
            href: res.list_videoLink,
            title: res.list_videoTitle,
          },
        });
      })
      .catch((err) => {
        console.log("jebło tak: " + err);
      });
  }

  closePlayer() {
    this.setState({
      nowPlaying: false,
    });
  }

  openMenu() {
    this.props.channelsHandler();
  }

  render() {
    return (
      <>
        <Header channelsHandler={this.openMenu} />
        <FavWrapper>
          {!this.state.empty ? (
            <>
              {this.state.data ? (
                <>
                  <div className="elements">
                    {this.state.data &&
                      this.state.data.map((element, index) => (
                        <FavListElementVideo
                          key={index}
                          id={element.list_videoId}
                          img={element.list_videoImage}
                          title={element.list_videoTitle}
                          channel={element.channel}
                          openedTooltip={
                            this.state.openedTooltip
                              ? this.state.openedTooltip
                              : false
                          }
                          isFav={this.state.faves}
                          refreshFaves={this.compileFromStorage}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <>
                  <Loading />
                </>
              )}
            </>
          ) : (
            <>
              <h1> Ulubione </h1>
              <p>
                Rozejrzyj się po kanałach. Poszukaj fajnej muzyki. Dodaj wybrane
                albumy do ulubionych, a będziesz mógł je potem przeglądać tutaj.
              </p>
            </>
          )}
          {this.state.nowPlaying && (
            <>
              <Player
                track={this.state.nowPlaying}
                closeHandler={this.closePlayer}
                returnHandler={"/fav/"}
              />
            </>
          )}
        </FavWrapper>
      </>
    );
  }
}

export default Fav;
