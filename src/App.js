import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "Components/Segments/Header/Header";
import Footer from "Components/Segments/Footer/Footer";
import Home from "Views/Home";
import Channel from "Views/Channel";
import SpacerFix from "Components/Elements/SpacerFix";
import Reviews from "Views/Reviews";
import Article from "Views/Article";
import "./App.css";
import "./Animations.css";

function App() {
  return (
    <Router>
      <SpacerFix />
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          path="/rev/:page?"
          component={(props) => <Reviews {...props} />}
        />
        <Route
          path="/art-:id/:title?/"
          component={(props) => <Article {...props} />}
        />
        <Route
          path="/:channel/:page/:album?"
          component={(props) => <Channel {...props} />}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
