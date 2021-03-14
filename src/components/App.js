import React from 'react';
import './App.scss';
import Web3 from 'web3';
import GameItem from "../abis/GameItem.json";
import Navbar from './Navbar/Navbar';
import Balance from './Balance/Balance';
import Transfer from './Transfer/Transfer';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      gameItem: {},
      gameItemBalance: 0,
      account: '0x0',
      tokens: [],
      loading: true
    }
    this.onTransfer = this.onTransfer.bind(this);
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.getTokens();
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

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();

    const gameItemData = GameItem.networks[networkId];
    if (gameItemData) {
      const gameItem = new web3.eth.Contract(GameItem.abi, gameItemData.address);
      this.setState({ gameItem });
      let gameItemBalance = await gameItem.methods.balanceOf(this.state.account).call();
      gameItemBalance = parseInt(gameItemBalance.toString(), 10);
      this.setState({ gameItemBalance });
    } else {
      window.alert("GameItem contract not deployed to the detected network");
    }

    this.setState({ loading: false });
  }

  async getTokens() {
    for (let i = 0; i < this.state.gameItemBalance; i++) {
      this.state.gameItem.methods.tokenOfOwnerByIndex(this.state.account, i).call().then(tokenId => {
        this.state.gameItem.methods.tokenURI(tokenId).call().then(tokenURI => {
          const token = { tokenId, tokenURI };
          this.setState({ tokens: [...this.state.tokens, token] });
        });
      });
    }
  }

  async onTransfer(tokenId, toAddress) {
    if (tokenId) {
      try {
        await this.state.gameItem.methods.safeTransferFrom(
          this.state.account,
          toAddress,
          tokenId
        ).send({ from: this.state.account });
        window.location.reload();
      } catch (error) {
        if (error.message.includes("invalid address")) {
          alert("Please input a valid address");
        }
      }
    } else {
      alert("Please select a token");
    }
  }
  
  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>;
    } else {
      content = (
        <div>
          <Balance gameItemBalance={this.state.gameItemBalance}
          tokens={this.state.tokens} />
          <Transfer account={this.state.account}
          tokens={this.state.tokens}
          onTransfer={this.onTransfer} />
        </div>
      );
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1200px' }}>
              <div className="content mr-auto ml-auto mt-3">
                <a
                  href="https://www.studio10b.nyc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
