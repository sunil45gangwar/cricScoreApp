import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';




const match = (props) => {
    return (
        <section style={{background: 'transparent'}}>
        <div className="container">
            <div className="row" >
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div className="image-flip" >
                        <div className="mainflip">
                            <div className="frontside">
                                <div className="card" style={{ marginTop : 20, marginBottom: 20}}>
                                    <div className="card-body text-center">
                                        {props.name || props.title ? <h4 style={{ color: ' #007b5e' }}>{props.name || props.title}</h4> : <h4 style={{ color: ' #007b5e' }}>{props.teamOne} vs {props.teamTwo} {props.type}</h4>}
                                        <p>{props.teamOne}</p>
                                        <p>{props.teamTwo}</p>
                                        {props.title ? <p>{props.description} </p> : <p>Toss : {props.toss}</p>}
                                        <p>{props.date}</p>
                                        <button className="btn btn-primary btn-md"
                                            disabled={props.name ? true : false}
                                            onClick={props.clicked}>View Detail</button>
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

export default match;