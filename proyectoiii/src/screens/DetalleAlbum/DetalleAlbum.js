import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";

import "./DetalleAlbum.css";

class DetalleAlbum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            album: null,
            favorito: false
        }
    }
    
    agrearAFavoritos() {
        let elementoFavorito = {
            id: this.state.album.id,
            titulo: this.state.album.title,
            foto_album: this.state.album.cover_medium,
            nombre_artista: this.state.album.artist.name,
            genero_artista: this.state.album.artist.genre,
            fecha_publicacion: this.state.album.release_date,
            lista_canciones: this.state.album.tracks.data
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
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/" + id)
            .then(response => response.json())
            .then(data => {

                let album = {
                    id: data.id,
                    title: data.title,
                    cover_medium: data.cover_medium,
                    release_date: data.release_date,
                    artist: {
                        name: data.artist.name,
                        genre: data.artist.genre
                    },
                    tracks: {
                        data: data.tracks.data
                    }  
                }

                console.log(album.tracks.data[0].title)

                this.setState({
                    album: album
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
                        this.state.album !== null ?
                        <>
                            <h1>Detalle del album</h1>
                            <img src={this.state.album.cover_medium} alt={this.state.album.title} />
                            <h4>{this.state.album.title}</h4>
                            <h5>{this.state.album.artist.name}</h5>
                            <h5>{this.state.album.artist.genre}</h5>
                            <h5>{this.state.album.release_date}</h5>
                            {
                                this.state.favorito ?
                                <button onClick={() => this.quitarDeFavoritos()}>Quitar de favoritos</button> :
                                <button onClick={() => this.agrearAFavoritos()}>Agregar a favoritos</button>
                            }
                            <h5>Listado canciones</h5>
                            <ul>
                            {
                                this.state.album.tracks.data.map((cancion, idx) => <li key={cancion.id}>{cancion.title}</li> )
                            }
                            </ul>
                        </> :
                        <p>Cargando...</p>
                    }
                </main>
                <Footer />
            </>
        )
    }
}

export default DetalleAlbum;