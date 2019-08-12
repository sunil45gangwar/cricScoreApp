import React, { Component } from 'react';
import axios from '../../../axios-matches';
import Aux from '../../../hoc/Aux/Aux';
import Spinner from '../../UI/Spinner/Spinner';

class PlayerStats extends Component {

    state = {
        playerStats: {},
        loading : true,
    }

    componentDidMount() {
        this.fetchPlayerStatics();
    }

    fetchPlayerStatics = () => {
        const id = this.props.match.params.pid
        const cachedData = localStorage.getItem(id);

        if (cachedData) {
            this.setState({ playerStats: JSON.parse(cachedData), loading:false });
        } else {

            let obj = {
                "apikey": "tTzabHsmnIPgA6CNdPwKGRCpduW2",
                "pid": id
            }
            console.log(obj);
            axios.post('/playerStats/', obj)
                .then(res => {
                    let data = res ? res.data : {};
                    this.onSetResult(data, id)
                })
                .catch((err) => console.log(err));
        }
    }

    onSetResult = (data, key) => {
        localStorage.setItem(key, JSON.stringify(data));

        this.setState({ playerStats: data, loading:false });
    };
   

    render() {
        const pData = this.state.playerStats;
        let detail = <Spinner />
        if(!this.state.loading){
        detail = (

            <div className="container">
                <div className="row" >
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <div className="image-flip" >
                            <div className="mainflip">
                                <div className="frontside">
                                    <div className="card" style={{ marginBottom: 20}}>
                                        <div className="card-body text-center">
                                            <p><img style={{ width: 120, height: 120, borderRadius: 60 }} src={pData.imageURL} alt="cardImage" /></p>
                                            <h4 style={{color : ' #007b5e'}}>{pData.fullName}</h4>
                                            <p className="card-text">{pData.name}</p>
                                            <h6>Country : {pData.country}</h6>
                                            <p className="card-text">Date-of-Birth :{pData.born}</p>
                                            <p>Current-Age :{pData.currentAge}</p>
                                            <p>Batting-Style :{pData.battingStyle}</p>
                                            <p>Bowling-Style :{pData.bowlingStyle}</p>
                                            <p>Major-Teams :{pData.majorTeams}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                </div>
            </div>
        )
        }
        return(
            <Aux>
                {detail}
            </Aux>
        )
    }
}

export default PlayerStats;