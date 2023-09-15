import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Articulo from "../../components/Articulo/Articulo";

import "./VerTodasLasCanciones.css";

class VerTodasLasCanciones extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listadoCanciones: [],
            listadoCancionesAMostrar: [],
            listadoCancionesAMostrarFiltrado: [],
            cantidadCancionesAMostrar: 10,
            filtro: "",
        }
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&limit=299")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    listadoCanciones: data.data
                })

                let listadoCancionesAMostrar = []

                data.data.map((cancion, i) => {
                    if (i < 10) {
                        listadoCancionesAMostrar.push(cancion)
                    }
                })

                this.setState({
                    listadoCancionesAMostrar: listadoCancionesAMostrar
                })
            })
            .catch(error => console.log(error))
    }

    mostrarMas() {
        if (this.state.cantidadCancionesAMostrar <= this.state.listadoCanciones.length) {
            let listadoCancionesAMostrar = this.state.listadoCancionesAMostrar
            
            for (let i = this.state.cantidadCancionesAMostrar; i < this.state.cantidadCancionesAMostrar + 10; i++) {
                listadoCancionesAMostrar.push(this.state.listadoCanciones[i])
            }
            
            this.setState({
                cantidadCancionesAMostrar: this.state.cantidadCancionesAMostrar + 10
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

        let listadoCancionesAMostrar = this.state.listadoCancionesAMostrar.filter(cancion => cancion.title.toLowerCase().includes(event.target.value.toLowerCase()))

        this.setState({
            listadoCancionesAMostrarFiltrado: listadoCancionesAMostrar
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

                <div className="ver-todas-canciones">
                {
                    this.state.listadoCanciones.length === 0 ?
                    <h2> CARGANDO...</h2>:
                    this.state.listadoCancionesAMostrarFiltrado.length > 0 ?
                    this.state.listadoCancionesAMostrarFiltrado.map((cancion, i) =>
                        <Articulo 
                            key={i} 
                            id={cancion.id} 
                            titulo={cancion.title} 
                            foto_album={cancion.album.cover_medium} 
                            nombre_artista={cancion.artist.name} 
                            titulo_album={cancion.album.title} 
                            duracion={cancion.duracion} 
                            ranking={cancion.rank} 
                        />
                    ) : 
                    this.state.listadoCancionesAMostrar.map((cancion, i) => 
                        <Articulo 
                            key={i} 
                            id={cancion.id} 
                            titulo={cancion.title} 
                            foto_album={cancion.album.cover_medium} 
                            nombre_artista={cancion.artist.name} 
                            titulo_album={cancion.album.title} 
                            duracion={cancion.duracion} 
                            ranking={cancion.rank} 
                        />
                    )
                }
                </div>
                <button onClick={() => this.mostrarMas()}>Cargar más canciones</button>
                <Footer />
            </>
        )
    }
}

export default VerTodasLasCanciones;