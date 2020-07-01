import React from "react";
import styled from "styled-components";
import Header from "Components/Segments/Header/Header";

const FavWrapper = styled.div`
  max-width: 1400px;
  margin: 32px auto 16px auto;
  text-align: center;
`;

class Fav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false,
    };

    this.openMenu = this.openMenu.bind(this);
  }

  componentDidMount() {
    this.loadFavs();
  }

  loadFavs() {
    console.log(
      "To muszę ogarnąć po stronie backendu, bo tak to bez sensu :O "
    );
  }

  openMenu() {
    this.props.channelsHandler();
  }

  render() {
    return (
      <>
        <Header channelsHandler={this.openMenu} />
        <FavWrapper>
          {this.state.data ? (
            <h1> Siema </h1>
          ) : (
            <>
              <h1> Ulubione </h1>
              <p>
                Rozejrzyj się po kanałach. Poszukaj fajnej muzyki. Dodaj wybrane
                albumy do ulubionych, a będziesz mógł je potem przeglądać tutaj.
              </p>
            </>
          )}
        </FavWrapper>
      </>
    );
  }
}

export default Fav;
