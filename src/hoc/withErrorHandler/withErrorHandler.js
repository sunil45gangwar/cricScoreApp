import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            })
        }

        componentWillUnmount(){
            console.log("will unmount" + this.reqInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmHandler = () => {
            this.setState({ error: null });
            console.log('j')
        }
        render() {


            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;