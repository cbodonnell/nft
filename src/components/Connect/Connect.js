import React from 'react';
import './Connect.scss'
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';


export default class Connect extends React.Component {

    constructor(props) {
        super(props);
        this.state = { account: '' };
        this.onConnect = this.onConnect.bind(this);
    }

    async componentDidMount() {
        await this.connect().catch(err => {});
    }

    async connect() {
        await this.loadWeb3().catch(err => {});
        await this.getAccount().catch(err => {});
    }

    async loadWeb3() {
        if (window.ethereum) {
            // Modern DApp browsers
            window.web3 = new Web3(window.ethereum);
            try {
                // await window.ethereum.request({ method: 'eth_requestAccounts' });
                await window.web3.eth.requestAccounts();
            } catch (error) {
                // User denied account access
                console.log(error);
            }
        } else if (window.web3) {
            // Legacy dapp browsers
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            // Non-dapp browsers
            console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
        }
    }

    async getAccount() {
        const web3 = window.web3;
    
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        this.setState({ account });

        this.props.setAccount(account);
    }

    onConnect(e) {
        e.preventDefault();
        this.connect();
    }

    render() {
        return (
            <>
                {!this.state.account &&
                    <Button variant="primary"
                        onClick={this.onConnect}
                        disabled={!window.ethereum || this.state.account}>Connect</Button>
                }
                {this.state.account &&
                    <span>{this.state.account}</span>
                }
            </>
        )
    }
}
