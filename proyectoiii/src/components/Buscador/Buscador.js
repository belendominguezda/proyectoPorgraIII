import React, { Component } from "react";

import "./Buscador.css";

class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            busqueda: ""
        }
    }

    prevenirBusqueda(evento) {
        evento.preventDefault();

        if (this.state.busqueda !== "") {
            console.log(this.state.busqueda);
        } else {
            console.log("No se ha buscado nada")
        }
    }

    guardarCambios(evento) {
        this.setState({
            busqueda: evento.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(e) => this.prevenirBusqueda(e)}>
                <input onChange={(e) => this.guardarCambios(e)} type="text" name="busqueda" value={this.state.busqueda} />
                <button type="submit">Buscar</button>
            </form>
        );
    }
}

export default Buscador;