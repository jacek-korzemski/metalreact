import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppWrapper from "Components/Segments/AppWrapper/AppWrapper";
import Home from "Views/Home";
import Channel from "Views/Channel";
import Reviews from "Views/Reviews";
import Article from "Views/Article";
import "./App.css";
import "./Animations.css";
import ChannelsList from "Components/Elements/ChannelsList";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: false,
    };

    this.openChannels = this.openChannels.bind(this);
    this.closeChannels = this.closeChannels.bind(this);
  }
  openChannels() {
    this.setState({
      channels: true,
    });
  }
  closeChannels() {
    this.setState({
      channels: false,
    });
  }
  render() {
    return (
      <>
        <Router>
          <AppWrapper>
            <Switch>
              <Route exact path="/">
                <Home channelsHandler={this.openChannels} />
              </Route>
              <Route
                path="/rev/:page?"
                component={(props) => (
                  <Reviews channelsHandler={this.openChannels} {...props} />
                )}
              />
              <Route
                path="/art-:id/:title?/"
                component={(props) => (
                  <Article channelsHandler={this.openChannels} {...props} />
                )}
              />
              <Route
                path="/:channel/:album?"
                component={(props) => (
                  <Channel channelsHandler={this.openChannels} {...props} />
                )}
              />
            </Switch>
          </AppWrapper>
          {this.state.channels && (
            <ChannelsList closeHandler={this.closeChannels} />
          )}
        </Router>
      </>
    );
  }
}

export default App;
