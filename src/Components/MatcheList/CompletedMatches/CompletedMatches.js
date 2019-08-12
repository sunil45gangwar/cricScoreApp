import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Match from '../../Match/Match';
import axios from '../../../axios-matches';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class CompletedMatches extends Component {

    state = {
        matchResults: [],
        loading: true,
    }

    componentDidMount() {
        this.fetchMatcheResults();
    }

    fetchMatcheResults() {
        let obj = {
            "apikey": "tTzabHsmnIPgA6CNdPwKGRCpduW2"
        }
        axios.post('cricket/', obj)
            .then(res => {
                this.setState({ matchResults: res ? res.data ? res.data.data : []:[], loading:false })
            })
            .catch(err => console.log(err));
    }

    fetchMatchDetail =(id)=>{
        this.props.history.push('/' + id)
    }

    render() {
        let match = <Spinner/>;
        let matchData; 
        if (!this.state.loading && this.state.matchResults && this.state.matchResults.length > 1 ) {
             matchData = this.state.matchResults;
            match = matchData.map((match, index) => {
                return (
                    <div  key={index}>
                        <Match
                            date=''
                            name=''
                            title={match.title}
                            description={match.description}
                            dateTimeGmt=''
                            matchStarted='true'
                            teamOne=''
                            teamTwo=''
                            toss='No Toss'
                            type=''
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


export default withErrorHandler(CompletedMatches, axios);