import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Match from '../../Match/Match';
import axios from '../../../axios-matches';
import Spinner from '../../UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actionCreators from '../../../Store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class UpcomingMatches extends Component {

    state = {
        matchCalendar: [],
        upcomingArray : [],
        loading : true,
    }

    componentDidMount() {
        this.props.onInitMatches();
        setTimeout(()=>{
            this.mapResponse();
        }, 5000)
        
        
    }

    mapResponse =()=>{
        const response = this.props.data ;
        const updateResponse = response ? response.data ? response.data.data : [] : [];
        let upcomingArray = updateResponse.splice(0, 20);
        this.setState({upcomingArray : upcomingArray , loading:false});
    }

    render() {
        let match = <Spinner />;
        let matchData; 
        if (!this.state.loading && this.state.upcomingArray && this.state.upcomingArray.length > 1) {
             matchData = this.state.upcomingArray;
            match = matchData.map((match, index) => {
                return (
                    <div  key={index}>
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

const mapStateToProps = state => {
    return {

        data: state.match.result,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitMatches: () => dispatch(actionCreators.initMatches())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UpcomingMatches ,axios));