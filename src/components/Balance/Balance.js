import React from 'react';
import './Balance.scss'
import GameItem from "../../abis/GameItem.json";


export default class Balance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameItem: {},
            gameItemBalance: '0',
        };
    }

    async componentDidMount() {
        await this.getBalance();
    }

    async getBalance() {
        const web3 = window.web3;

        const networkId = await web3.eth.net.getId();

        const gameItemData = GameItem.networks[networkId];
        console.log(gameItemData);
        if (gameItemData) {
            const gameItem = new web3.eth.Contract(GameItem.abi, gameItemData.address);
            console.log(gameItem);
            this.setState({ gameItem });
            let gameItemBalance = await gameItem.methods.balanceOf(this.props.account).call();
            this.setState({ gameItemBalance: gameItemBalance.toString() });
        } else {
            window.alert("GameItem contract not deployed to the detected network");
        }
    }

    render() {
        return (
            <>
                <p>Balance: {this.state.gameItemBalance}</p>
            </>
        )
    }
}
