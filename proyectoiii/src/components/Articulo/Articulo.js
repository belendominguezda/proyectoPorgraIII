import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./Articulo.css";

class Articulo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verMas: false,
            favorito: false
        }
    }

    verMas() {
        this.setState({
            verMas: true
        })
    }

    verMenos() {
        this.setState({
            verMas: false
        })
    }

    agrearAFavoritos() {
        let elementoFavorito = {
            id: this.props.id,
            titulo: this.props.titulo,
            foto_album: this.props.foto_album,
            nombre_artista: this.props.nombre_artista,
            titulo_album: this.props.titulo_album,
            duracion: this.props.duracion,
            ranking: this.props.ranking
        }

        let favoritos = JSON.parse(localStorage.getItem("favoritos"))

        if (favoritos === null) {
            favoritos = []
        }

        favoritos.push(elementoFavorito)

        localStorage.setItem("favoritos", JSON.stringify(favoritos))

        this.setState({
            favorito: true
        })

    }

    quitarDeFavoritos() {
        
        let favoritos = JSON.parse(localStorage.getItem("favoritos"))

        let favoritosSinElemento = favoritos.filter((elm) => elm.id !== this.props.id)

        localStorage.setItem("favoritos", JSON.stringify(favoritosSinElemento))

        this.setState({
            favorito: false
        })
    }

    componentDidMount() {
        let favoritos = JSON.parse(localStorage.getItem("favoritos"))

        if (favoritos !== null) {
            let favorito = favoritos.filter((elm) => elm.id === this.props.id)

            if (favorito.length > 0) {
                this.setState({
                    favorito: true
                })
            }
        }
    }

    render() {
        return (
            <article>
                <img src={this.props.foto_album} alt={this.props.titulo} />
                <h4>{this.props.titulo}</h4>
                {
                    this.state.verMas ?
                    <section className="descripcion">
                        <h4>Descripción:</h4>
                        <h6>Artista: {this.props.nombre_artista}</h6>
                        {
                            this.props.titulo_album !== null ?
                            <h6>Album: {this.props.titulo_album}</h6> :
                            null
                        }
                        {
                            this.props.duracion !== null ?
                            <h6>Duración: {this.props.duracion}</h6> :
                            null
                        }
                        {
                            this.props.ranking !== null ?
                            <h6>Ranking: {this.props.ranking}</h6> :
                            null
                        }
                    </section> :
                    null
                }
                {
                    this.state.verMas ?
                    <button onClick={() => this.verMenos()}>Ver menos</button> :
                    <button onClick={() => this.verMas()}>Ver más</button>
                }
                {
                    this.props.duracion !== null ?
                    <Link to={`/cancion/${this.props.id}`}>Ir a detalle</Link> :
                    <Link to={`/album/${this.props.id}`}>Ir a detalle</Link>
                }
                {
                    this.state.favorito ?
                    <button onClick={() => this.quitarDeFavoritos()}>Quitar de favoritos</button> :
                    <button onClick={() => this.agrearAFavoritos()}>Agregar a favoritos</button>
                }
            </article>
        )
    }
}

export default Articulo;