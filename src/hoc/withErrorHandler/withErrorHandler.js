import React, { Component } from  'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';;

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
                error: null,
            }
        
        

        componentDidMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.state({error: null})
                return request;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log('[withErrorHandler] component did mount', error)
                this.setState({error: error})
            })
        }
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }


        // componentDidCatch (error, info) {
        //     console.log('__withErrorHandler__', error, info)
        //     this.setState({error: error, info: info })
        // }
   

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render () {
            return (
                <Aux>
                    <Modal 
                    modalClosed={this.errorConfirmedHandler} 
                    show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            ) 
        }
        
    };
}

export default withErrorHandler;