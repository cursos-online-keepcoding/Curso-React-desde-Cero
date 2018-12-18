import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';


export class Heading extends React.Component {
    render() {
        return (
            <div>
                <h1>Aplicación de Rick & Morty</h1>
                <ul className="menu">
                    <li><NavLink to="/personaje/añadir">Formulario</NavLink></li>
                    <li><NavLink to="/index">Personajes</NavLink></li>
                </ul>
            </div>
        );
    }
}


class MyFoot extends React.Component {
    render() {
        if (this.props.location.pathname === '/personaje/añadir') {
            return <div></div>
        }

        return (
            <div className="foot">
                <a href="http://google.com">Condiciones de uso</a>
                <a href="http://wadobo.com">Terminos legales</a>
            </div>
        );
    }
}

export const Foot = withRouter(MyFoot);
