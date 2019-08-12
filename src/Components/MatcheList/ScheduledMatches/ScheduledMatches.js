import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Match from '../../Match/Match';
import axios from '../../../axios-matches';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ScheduledMatches extends Component {

    state = {
        matchCalendar: [],
        loading: true,
    }

    componentDidMount() {
        this.fetchMatchesCalander();
    }

    fetchMatchesCalander() {
        let obj = {
            "apikey": "tTzabHsmnIPgA6CNdPwKGRCpduW2"
        }
        axios.post('matchCalendar/', obj)
            .then(res => {
                this.setState({ matchCalendar: res ? res.data ? res.data.data : [] : [], loading:false })
            })
            .catch(err => console.log(err));
    }

    render() {
        let match = <Spinner />;
        let matchData;
        if ( !this.state.loading && this.state.matchCalendar &&this.state.matchCalendar.length > 1) {
            matchData = this.state.matchCalendar;
            match = matchData.map((match, index) => {
                return (
                    <div key={index}>
                        <Match
                            date={match.date}
                            name={match.name}
                            dateTimeGmt=''
                            matchStarted='false'
                            teamOne=''
                            teamTwo=''
                            toss='No Toss'
                            type=''
                            uniqueId={match.unique_id}
                            clicked={this.fetchMatchDetail}
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

export default withErrorHandler(ScheduledMatches, axios);