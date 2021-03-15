import React from 'react';
import './Delete.scss';


export default class Delete extends React.Component {

    constructor(props) {
        super(props);
        this.state = { deleteToken: 0 };
        this.onChangeDeleteToken = this.onChangeDeleteToken.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onChangeDeleteToken(event) {
        const deleteToken = parseInt(event.target.value, 10);
        this.setState({deleteToken});
    }

    async onDelete(e) {
        e.preventDefault();
        this.props.onDelete(this.state.deleteToken);
    }

    render() {
        return (
            <>
                <form className="my-4">
                    <h5>Transfer:</h5>
                    <div className="form-group">
                        <label for="token">Token:</label>
                        <select 
                        id="token"
                        className="form-control"
                        value={this.state.deleteToken} 
                        onChange={this.onChangeDeleteToken}>
                            <option value="0" >Select Token</option>
                            {this.props.tokens.map((token, index) =>
                                <option key={index} value={token.tokenId}>{token.tokenURI}</option>
                            )}
                        </select>
                    </div>
                    <button className="btn btn-danger my-2" type="submit" onClick={this.onDelete}>Delete</button>
                </form>
            </>
        );
    }
}
