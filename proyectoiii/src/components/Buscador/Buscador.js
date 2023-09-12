import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./Buscador.css";

class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            busqueda: ""
        }
    }

    guardarCambios(evento) {
        this.setState({
            busqueda: evento.target.value
        })
    }

    render() {
        return (
            <form>
                <input onChange={(e) => this.guardarCambios(e)} type="text" name="busqueda" value={this.state.busqueda} />
                <button type="submit"><Link to={`/resultado-busqueda/${this.state.busqueda}`}>Buscar</Link></button>
            </form>
        );
    }
}

export default Buscador;