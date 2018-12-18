import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSkull, faHeart, faQuestion, faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import './Card.css'


library.add(faSkull, faHeart, faQuestion, faMale, faFemale);


export default class MyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: this.props.state,
            chapters: this.props.chapters,
            app: "qwerty"
        }
    }

    setApp = (param) => {
        this.setState({app: param});
    }

    kill = (param, e) => {
        console.log(e.target.value, param);
        this.setState({state: e.target.value});
    }

    rmCharacter = (e) => {
        this.props.rmCharacter(this.props.titulo);
    }

    render() {
        let icon_name = "";
        let icon_gender = "";
        switch (this.state.state) {
            case "Alive":
                icon_name = "heart";
                break;
            case "Dead":
                icon_name = "skull";
                break;
            default:
                icon_name = "question";
                break;
        }

        switch (this.props.gender) {
            case "Male":
                icon_gender = "male";
                break;
            case "Female":
                icon_gender = "female";
                break;
            default:
                icon_gender = "question";
                break;
        }

        return (
            <div>
            <Card>
                <CardImg top width="100%" src={this.props.img} />
                <CardBody>
                    <CardTitle>{this.props.titulo}</CardTitle>
                    <CardSubtitle>
                        <FontAwesomeIcon icon={icon_name} />
                        <FontAwesomeIcon icon={icon_gender} />
                    </CardSubtitle>
                    <CardText>
                        {this.state.chapters}
                    </CardText>
                </CardBody>
                <Button onClick={this.rmCharacter}>Eliminar</Button>
            </Card>
            </div>
        );
    }
}
