import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../../hoc/AsyncComponent';
import axios from '../../axios-matches';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const asyncNewPosts = asyncComponent(() => {
    return import('./PlayerStats/PlayerStats');
})

const playerImage = require('../../assets/images/profile.jpeg')

class Search extends Component {

    state = {
        query: '',
        playersList: [],
        showPlayerStats: false,
        showSearchedPlayers: true,
        loading: false,
    };

    onSearch = event => {
        event.preventDefault();
        this.setState({ showPlayerStats: false, showSearchedPlayers: true, loading: true })

        const { query } = this.state;
        if (query === '') {
            return;
        }

        const cachedData = localStorage.getItem(query);

        if (cachedData) {
            this.setState({ playersList: JSON.parse(cachedData), loading: false });
        } else {
            let obj = {
                "apikey": "tTzabHsmnIPgA6CNdPwKGRCpduW2",
                "name": query
            }
            axios.post('/playerFinder/', obj)
                .then(res => {
                    let data = res ? res.data ? res.data.data : [] : [];
                    console.log(data);
                    this.onSetResult(data, query)
                })
                .catch((err) => console.log(err));
        }
    };

    onSetResult = (data, key) => {
        localStorage.setItem(key, JSON.stringify(data));

        this.setState({ playersList: data, loading: false });
    };

    onChange = event => {
        this.setState({ query: event.target.value });
    };

    fetchPlayerStats = (pid) => {
        this.setState({ showPlayerStats: true, showSearchedPlayers: false })
        this.props.history.push('/search/' + pid);
    }

    render() {
        let detail = <Spinner />
        if (!this.state.loading) {
            detail = (

                <section style={{ background: '#eee' }}>
                    <div className="container">
                        <div className="coloumn">
                            <div className="row">
                                <div className="col-xs-3 col-md-3 col-lg-3"></div>
                                <div className="col-xs-6 col-md-6 col-lg-6" style={{ marginTop: 30, marginBottom: 20 }}>
                                    <div className="form-group">
                                        <form onSubmit={this.onSearch}>
                                            <input type="text" className="form-control form-control-md" onChange={this.onChange} />
                                            <button className="btn btn-primary btn-md" style={{ marginTop: 20, }}>Search</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-xs-3 col-lg-3"></div>
                            </div>
                            {this.state.showPlayerStats ?
                                <Route
                                    path="/search/:pid"
                                    component={asyncNewPosts} /> : null}
                            {this.state.showSearchedPlayers && this.state.playersList ? this.state.playersList.map((value, index) => {
                                return (
                                    <div key={value.pid} className="row" style={{ marginTop: 20 }} >
                                        <div className="col-xs-2 col-sm-2 col-md-3 col-lg-3"></div>
                                        <div className="col-xs-8 col-sm-8 col-md-6 col-lg-6">
                                            <div className="image-flip">
                                                <div className="mainflip">
                                                    <div className="frontside">
                                                        <div className="card">
                                                            <div className="card-body text-center">
                                                                <p><img style={{ width: 120, height: 120, borderRadius: 60 }} src={playerImage} alt="cardImage" /></p>
                                                                <h4 style={{ color: ' #007b5e' }} className="card-title">{value.fullName}</h4>
                                                                <p className="card-text">{value.name}</p>
                                                                <button className="btn btn-primary btn-sm" onClick={() => this.fetchPlayerStats(value.pid)}>View Profile</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-2 col-sm-2 col-md-3 col-lg-3"></div>
                                    </div>
                                );
                            }) : null}
                        </div>

                    </div>
                </section>
            );
        }
        return (
            <Aux>
                {detail}
            </Aux>
        )
    }
}

export default withErrorHandler(Search, axios);