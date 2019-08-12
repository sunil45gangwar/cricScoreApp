import React, { Component } from 'react';
import axios from '../../axios-matches';
import Spinner from '../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class MatchDetail extends Component {

    state = {
        matchDetail: {},
        loading: true,
    }

    componentDidMount() {
        this.fetchMatchDetail();
    }

    fetchMatchDetail() {
        let uniqueId = this.props.match.params.id
        let obj = {
            "apikey": "tTzabHsmnIPgA6CNdPwKGRCpduW2",
            "unique_id": uniqueId
        }
        axios.post('/cricketScore/', obj)
            .then(res => {
                this.setState({ matchDetail: res ? res.data : {} ,loading: false });
            })
            .catch(err => console.log(err));
    }



    render() {
        let matchDetail = <Spinner />;
        if (!this.state.loading && this.state.matchDetail) {
            const matchData = this.state.matchDetail;
            matchDetail = (
                <section style={{background: '#eee'}}>
                <div className="container" >
                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <div className="image-flip" >
                                <div className="mainflip">
                                    <div className="frontside">
                                        <div className="card" style={{ marginTop : 20, marginBottom: 20}}>
                                            <div className="card-body text-center">
                                                <h4 style={{ color: "#007b5e"}}>{matchData['team-1']} VS {matchData['team-2']} </h4>
                                                <p>{matchData['team-1']}</p>
                                                <p>{matchData['team-2']}</p>
                                                <p>{matchData.score}</p>
                                                <p>{matchData.stat}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                    </div>
                </div>
                </section>
            );
        }
        return (
            <div>
                {matchDetail}
            </div>
        )

    }
}

export default withErrorHandler(MatchDetail, axios);