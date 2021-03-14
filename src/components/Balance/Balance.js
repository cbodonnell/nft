import React from 'react';
import './Balance.scss';


export default class Balance extends React.Component {

    render() {
        return (
            <>
                <div className="my-4">
                    <h5>Tokens:</h5>
                    <ol>
                        {this.props.tokens.map((token, index) =>
                            <li key={index}>[{token.tokenId}] {token.tokenURI}</li>
                        )}
                    </ol>
                </div>
            </>
        )
    }
}
