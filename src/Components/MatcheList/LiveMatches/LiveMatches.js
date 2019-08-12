import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Match from '../../Match/Match';
import axios from '../../../axios-matches';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class LiveMatches extends Component {

    constuctor() {
        this.fetchMatchDetail = this.fetchMatchDetail.bind(this);
      }

    state = {
        liveMatches: [],
        loading : true,
    }

    componentDidMount() {
        this.fetchLiveMatches();
    }

    fetchLiveMatches() {
        let obj = {
            "apikey": "tTzabHsmnIPgA6CNdPwKGRCpduW2"
        }
        axios.post('/matches/', obj)
            .then(res => {
                this.setState({ liveMatches: res ? res.data ? res.data.matches : [] : [], loading:false })
            })
            .catch(err => console.log(err));
    }

    fetchMatchDetail = (id) => {
        this.props.history.push('/' + id)
    }

    render() {
        let match = <Spinner/>;
        if (!this.state.loading && this.state.liveMatches && this.state.liveMatches.length > 1) {
            const matchData = this.state.liveMatches;
            match = matchData.map((match) => {
                return (
                    <div  key={match.unique_id}>
                        <Match
                            date={match.date}
                            dateTimeGmt={match.dateTimeGmt}
                            matchStarted={match.matchStarted}
                            teamOne={match['team-1']}
                            teamTwo={match['team-2']}
                            toss={match['toss_winner_team']}
                            type={match.type}
                            uniqueId={match.unique_id}
                            clicked={()=>this.fetchMatchDetail(match.unique_id)}
                        />
                    </div>)
            })
        }
        return (
            <Aux>
                {match}
            </Aux>
        )
    }
}

export default withErrorHandler(LiveMatches ,axios);