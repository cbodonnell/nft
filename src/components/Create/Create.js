import React from 'react';
import { random } from '../../utils/random';
import './Create.scss';


export default class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            tokenURI: ''
        };
        // this.onChangeTokenURI = this.onChangeTokenURI.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    componentDidMount() {
        const tokenURI = random(24);
        this.setState({ tokenURI });
    }

    // onChangeTokenURI(event) {
    //     const tokenURI = event.target.value;
    //     this.setState({tokenURI});
    // }

    async onCreate(e) {
        e.preventDefault();
        this.props.onCreate(this.state.tokenURI);
    }

    render() {
        return (
            <>
                <form className="my-4">
                    <h5>Create:</h5>
                    <p>URI: {this.state.tokenURI}</p>
                    {/* <div className="form-group">
                        <label for="uri">URI:</label>
                        <input 
                        id="uri"
                        className="form-control"
                        placeholder="https://donotoken.org/tokens/TokenHash.json"
                        value={this.state.tokenURI}
                        onChange={this.onChangeTokenURI} />
                    </div> */}
                    <button className="btn btn-primary my-2" type="submit" onClick={this.onCreate}>Create</button>
                </form>
            </>
        );
    }
}
