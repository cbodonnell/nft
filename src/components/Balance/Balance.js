import React from 'react';
import './Balance.scss';


export default class Balance extends React.Component {

    render() {
        return (
            <>
                <h5>Tokens:</h5>
                <ol>
                    {this.props.tokens.map((token, index) =>
                        <li key={index}>[{token.tokenId}] {token.tokenURI}</li>
                    )}
                </ol>
            </>
        )
    }
}
