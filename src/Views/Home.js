import React from "react";
import styled from "styled-components";

const HomeWrapper = styled.div`
  max-width: 1400px;
  min-height: calc(100vh - 64px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  h1 {
    width: 100%;
    text-align: center;
  }
  p {
    width: 100%;
    text-align: center;
  }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <h1> MetalReact.pl </h1>
      <p>
        Wygodna kompilacja najlepszych kanałów na youtube promujących młode
        zespoły muzyczne z gatunku Rock/Metal. Główna idea która przyświeca
        serwisowi to ułatwienie słuchaczom przeglądanie nowej muzyki.
        Przeglądanie bezpośrednio w serwisie YouTube wiąże się ze skakaniem po
        kanałach i ich zakładkach, a czasem nawet samo znalezienie kanału nie
        należy do najłatwiejszych.
      </p>
      <p>
        Na MetalReact.pl znajdziesz 19 najpopularniejszych kanałów które
        umieszczają pełne albumy i/lub pojedyncze utwory niszowych zespołów.
        Wszystkie kanały w serwisie są aktualizowane raz dziennie, więc nie
        przegapisz żadnych nowości!
      </p>
    </HomeWrapper>
  );
};

export default Home;
