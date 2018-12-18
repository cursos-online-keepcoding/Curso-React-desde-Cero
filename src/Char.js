import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  Card from './Card';

import { connect } from 'react-redux';


export class Char extends Component {
    state = {
        character: null,
        error: null,
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id, 10);
        if (this.props.characters.length === 0) {
            return;
        }

        if (!this.state.character || this.state.character.id !== id) {
            let chars = this.props.characters.filter(ch => ch.id === id);
            this.setState({character: chars[0]});
        }
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
    }

    render() {
        if (!this.state.character) {
            return <div>
                { this.state.error &&
                    <div className="alert alert-danger">{this.state.error}</div>
                }
            </div>
        }

        let ch = this.state.character;

        return (
            <div>
                { this.state.error &&
                    <div className="alert alert-danger">{this.state.error}</div>
                }

                <h1>{ch.name}</h1>
                <h2>{ch.species}</h2>

                <Card
                    titulo={ch.name}
                    state={ch.status} gender={ch.gender}
                    img={ch.image}
                />

                <Link to="/index">Volver</Link>
            </div>
        );
    }
}

const mapState = (state) => {
    return { characters: state.characters };
}

const charcomp = connect(mapState, null)(Char);

export default charcomp;
