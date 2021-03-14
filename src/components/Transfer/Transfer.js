import React from 'react';
import './Transfer.scss';


export default class Balance extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            transferToken: 0,
            transferTo: ''
        };
        this.onChangeTransferToken = this.onChangeTransferToken.bind(this);
        this.onChangeTransferTo = this.onChangeTransferTo.bind(this);
        this.onTransfer = this.onTransfer.bind(this);
    }

    onChangeTransferToken(event) {
        const transferToken = parseInt(event.target.value, 10);
        this.setState({transferToken});
    }

    onChangeTransferTo(event) {
        const transferTo = event.target.value;
        this.setState({transferTo});
    }

    async onTransfer(e) {
        e.preventDefault();
        this.props.onTransfer(this.state.transferToken, this.state.transferTo);
    }

    render() {
        return (
            <>
                <form>
                    <h5>Transfer:</h5>
                    <div className="form-group">
                        <label for="token">Token:</label>
                        <select 
                        id="token"
                        className="form-control"
                        value={this.state.transferToken} 
                        onChange={this.onChangeTransferToken}>
                            <option value="0" >Select Token</option>
                            {this.props.tokens.map((token, index) =>
                                <option key={index} value={token.tokenId}>{token.tokenURI}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="transfer-to">To:</label>
                        <input 
                        id="transfer-to"
                        className="form-control"
                        placeholder="0x0000000000000000000000000000000000000000"
                        value={this.state.transferTo}
                        onChange={this.onChangeTransferTo} />
                    </div>
                    <button className="btn btn-primary mt-2" type="submit" onClick={this.onTransfer}>Transfer</button>
                </form>
            </>
        );
    }
}
