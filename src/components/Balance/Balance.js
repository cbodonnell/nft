import React from 'react';
import './Balance.scss'
import GameItem from "../../abis/GameItem.json";


export default class Balance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameItem: {},
            gameItemBalance: 0,
            tokens: []
        };
        this.onTransfer = this.onTransfer.bind(this);
    }

    async componentDidMount() {
        await this.getBalance();
    }

    async getBalance() {
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();

        const gameItemData = GameItem.networks[networkId];
        if (gameItemData) {
            const gameItem = new web3.eth.Contract(GameItem.abi, gameItemData.address);
            this.setState({ gameItem });
            let gameItemBalance = await gameItem.methods.balanceOf(this.props.account).call();
            gameItemBalance = parseInt(gameItemBalance.toString(), 10);
            this.setState({ gameItemBalance });

            for (let i = 0; i < gameItemBalance; i++) {
                gameItem.methods.tokenOfOwnerByIndex(this.props.account, i).call().then(tokenId => {
                    tokenId = parseInt(tokenId.toString());
                    gameItem.methods.tokenURI(tokenId).call().then(tokenURI => {
                        const token = { tokenId, tokenURI };
                        this.setState({tokens: [...this.state.tokens, token]});
                    });
                });
                
            }
        } else {
            window.alert("GameItem contract not deployed to the detected network");
        }
    }

    async onTransfer(e, tokenId) {
        e.preventDefault();
        // Transfer token
        await this.state.gameItem.methods.safeTransferFrom(
            this.props.account,
            '0x5b49165ecE4d9725267406A7b5c2Df174E869499', // TODO: Make this dynamic from user input
            tokenId
        ).send({ from: this.props.account });
    }

    render() {
        return (
            <>
                <p>Balance: {this.state.gameItemBalance}</p>
                <p>Tokens:</p>
                <ol>
                    {this.state.tokens.map((token, index) =>
                        <li key={index}>[{token.tokenId}] {token.tokenURI} <button onClick={(e) => this.onTransfer(e, token.tokenId)}>Transfer</button></li>
                    )}
                </ol>
            </>
        )
    }
}
