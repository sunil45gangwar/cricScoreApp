import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Containers/Layout/Layout';

import CompletedMatches from './Components/MatcheList/CompletedMatches/CompletedMatches';
import LiveMatches from './Components/MatcheList/LiveMatches/LiveMatches';
import ScheduledMatches from './Components/MatcheList/ScheduledMatches/ScheduledMatches';
import UpcomingMatches from './Components/MatcheList/UpcomingMatches/UpcomingMatches';
import MatchDetail from './Components/MatchDetail/MatchDetail';
import Search from './Components/FindPlayer/FindPlayer';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>

            <Route path="/schedule" component={ScheduledMatches} />
            <Route path="/upcoming" component={UpcomingMatches} />
            <Route path="/scores" component={CompletedMatches} />
            <Route path="/search" component={Search} />
            <Route path="/:id" component={MatchDetail} />
            <Route path="/" exact component={LiveMatches} />
          </Switch>
        </Layout>
      </div>
    );
  }

}

export default App;
