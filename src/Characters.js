import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Input } from 'reactstrap';

import Card from './Card';

import { actions } from './store';
import { connect } from 'react-redux';


export class Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            filter_name: "",
            click: 0,
        }
    }

    componentDidMount() {
        if (this.props.characters.length === 0) {
            setTimeout(() => {
                fetch("https://rickandmortyapi.com/api/character/")
                    .then(r => r.json())
                    .then(d => {
                        this.props.set(d.results);
                    });
            }, 3000);
        }
    }

    extractChapters = (chapters) => {
        let res = [];
        chapters.forEach(ch =>
            res.push(ch.split("/").slice(-1)[0])
        )
        return res.join(",");
    }

    rmCharacter = (name) => {
        let copy = [...this.state.characters];
        let index = -1;
        copy.forEach((ch, i) => {
            if (ch.name === name) {
                index = i;
            }
        });
        if (index !== -1) {
            copy.splice(index, 1);
            this.setState({characters: copy});
        }
    }

    filterCharacters = (e) => {
        let value = ""
        if (e.target.value.length >= 3) {
            value = e.target.value;
        }
        this.setState({filter_name: value});
    }

    setClick = (ev) => {
        this.setState({click: this.state.click + 1});
        if (this.props.click) {
            this.setState({ fake: this.props.click(this.state.click) });
        }
        return false;
    }

    render() {
        return(
            <div>
                <a className="link" onClick={this.setClick}>Hacer Click ({this.state.click})</a>

                <Input onChange={this.filterCharacters} placeholder="Filtrar personaje por nombre" />
                <br/>
                { this.props.characters.length === 0 && <div className="loading">Cargando...</div> }
                <Container>
                    <Row>
                        { this.props.characters.map((ch, i) => {
                            if (ch.name.includes(this.state.filter_name)) {
                                return <Col key={i}>
                                    <Link to={"/personaje/" + ch.id}>
                                    <Card
                                        rmCharacter={this.rmCharacter}
                                        key={i}
                                        titulo={ch.name}
                                        state={ch.status} gender={ch.gender}
                                        img={ch.image}
                                    chapters={this.extractChapters(ch.episode)} />
                                    </Link>
                                </Col>;
                            } else {
                                return <div></div>;
                            }
                        }
                        )}
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapState = (state) => {
    return { characters: state.characters };
}

const mapActions = { set: actions.setChars };

const characters = connect(mapState, mapActions)(Characters);

export default characters;
