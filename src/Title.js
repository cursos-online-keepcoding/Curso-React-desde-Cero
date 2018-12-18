import React, { Component } from 'react';
import './Title.css';


export default class Title extends Component {

    componentDidMount() {
        this.props.setApp("ytrewq");
    }

    render() {
        return (
            <div className="rym">
            <h1>{this.props.titulo}</h1>
            </div>
        );
    }
}
