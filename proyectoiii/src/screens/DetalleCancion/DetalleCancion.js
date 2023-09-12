import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";

import "./DetalleCancion.css";

class DetalleCancion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cancion: null,
            favorito: false
        }
    }
    
    agrearAFavoritos() {
        let elementoFavorito = {
            id: this.state.cancion.id,
            titulo: this.state.cancion.title,
            foto_album: this.state.cancion.album.cover_medium,
            nombre_artista: this.state.cancion.artist.name,
            titulo_album: this.state.cancion.album.title,
            duracion: this.state.cancion.duration,
            ranking: this.state.cancion.rank
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

        let favoritosSinElemento = favoritos.filter((elm) => elm.id !== this.state.cancion.id)

        localStorage.setItem("favoritos", JSON.stringify(favoritosSinElemento))

        this.setState({
            favorito: false
        })
    }
    
    componentDidMount() {

        let id = this.props.match.params.id
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/" + id)
            .then(response => response.json())
            .then(data => {

                let cancion = {
                    id: data.id,
                    title: data.title,
                    preview: data.preview,
                    artist: {
                        name: data.artist.name
                    },
                    album: {
                        title: data.album.title,
                        cover_medium: data.album.cover_medium
                    },
                    duration: data.duration,
                    rank: data.rank
                }

                this.setState({
                    cancion: cancion
                })
            })
            .catch(error => console.log(error))
        
        let favoritos = JSON.parse(localStorage.getItem("favoritos"))
    
        let IntId = parseInt(id)

        if (favoritos !== null) {
            let favorito = favoritos.filter((elm) => elm.id === IntId)

            if (favorito.length > 0) {
                this.setState({
                    favorito: true
                })
            }
        }
    }

    render() {
        return (
            <>
                <Header />
                <Buscador />
                <main>
                    {
                        this.state.cancion !== null ?
                        <>
                            <h1>Detalle de la canción</h1>
                            <img src={this.state.cancion.album.cover_medium} alt={this.state.cancion.title} />
                            <h4>{this.state.cancion.title}</h4>
                            <h5>{this.state.cancion.artist.name}</h5>
                            <h5>{this.state.cancion.album.title}</h5>
                            <audio controls>
                                <source src={this.state.cancion.preview} type="audio/mpeg" />
                            </audio>
                            {
                                this.state.favorito ?
                                <button onClick={() => this.quitarDeFavoritos()}>Quitar de favoritos</button> :
                                <button onClick={() => this.agrearAFavoritos()}>Agregar a favoritos</button>
                            }
                        </> :
                        <p>Cargando...</p>
                    }
                </main>
                <Footer />
            </>
        )
    }
}

export default DetalleCancion;
