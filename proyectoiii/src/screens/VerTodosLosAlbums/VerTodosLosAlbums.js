import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Articulo from "../../components/Articulo/Articulo";

//import "./VerTodasLosAlbums.css";

class VerTodosLosAlbums extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listadoAlbums: [],
            listadoAlbumsAMostrar: [],
            listadoAlbumsAMostrarFiltrado: [],
            cantidadAlbumsAMostrar: 10,
            filtro: "",
        }
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&limit=299")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    listadoAlbums: data.data
                })

                let listadoAlbumsAMostrar = []

                data.data.map((album, i) => {
                    if (i < 10) {
                        listadoAlbumsAMostrar.push(album)
                    }
                })

                this.setState({
                    listadoAlbumsAMostrar: listadoAlbumsAMostrar
                })
            })
            .catch(error => console.log(error))
    }

    mostrarMas() {
        if (this.state.cantidadAlbumsAMostrar <= this.state.listadoAlbums.length) {
            let listadoAlbumsAMostrar = this.state.listadoAlbumsAMostrar
            
            for (let i = this.state.cantidadAlbumsAMostrar; i < this.state.cantidadAlbumsAMostrar + 10; i++) {
                listadoAlbumsAMostrar.push(this.state.listadoAlbums[i])
            }
            
            this.setState({
                cantidadAlbumsAMostrar: this.state.cantidadAlbumsAMostrar + 10
            })
        }
    }

    prevDefault(event) {
        event.preventDefault()
    }

    filtrar(event) {
        this.setState({
            filtro: event.target.value
        })

        let listadoAlbumsAMostrar = this.state.listadoAlbumsAMostrar.filter(album => album.title.toLowerCase().includes(event.target.value.toLowerCase()))

        this.setState({
            listadoAlbumsAMostrarFiltrado: listadoAlbumsAMostrar
        })

        console.log(event.target.value)

    }

    render() {
        return (
            <>
                <Header />
                <Buscador />
                <form onSubmit={(event) => this.prevDefault(event)}>
                    <input onChange={(event) => this.filtrar(event)} placeholder="Ingrese una palabra" value={this.state.filtro} />
                    <button type="submit">Filtrar</button>
                </form>
                {
                    this.state.listadoAlbums.length === 0 ?
                    <h2> CARGANDO...</h2>:
                    this.state.listadoAlbumsAMostrarFiltrado.length > 0 ?
                    this.state.listadoAlbumsAMostrarFiltrado.map((album, i) =>
                        <Articulo 
                            key={i} 
                            id={album.id} 
                            titulo={album.title} 
                            foto_album={album.album.cover_medium} 
                            nombre_artista={album.artist.name} 
                            titulo_album={album.album.title} 
                            duracion={album.duracion} 
                            ranking={album.rank} 
                        />
                    ) :
                    this.state.listadoAlbumsAMostrar.map((album, i) => 
                        <Articulo 
                            key={i} 
                            id={album.id} 
                            titulo={album.title} 
                            foto_album={album.album.cover_medium} 
                            nombre_artista={album.artist.name} 
                            titulo_album={album.album.title} 
                            duracion={album.duracion} 
                            ranking={album.rank} 
                        />
                    )
                }
                <button onClick={() => this.mostrarMas()}>Cargar más Albums</button>
                <Footer />
            </>
        )
    }
}

export default VerTodosLosAlbums;