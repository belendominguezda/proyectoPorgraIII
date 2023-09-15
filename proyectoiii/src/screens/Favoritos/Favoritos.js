import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Articulo from "../../components/Articulo/Articulo";

import "./Favoritos.css";

class Favoritos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listadoCanciones: [],
            listadoAlbums: [],
        }
    }

    componentDidMount() {
        let favoritos = JSON.parse(localStorage.getItem("favoritos"))

        if (favoritos == null) {
            favoritos = []
        }

        let listadoCanciones = favoritos.filter(fav => fav.duracion !== null)
        let listadoAlbums = favoritos.filter(fav => fav.duracion === null)
       
        this.setState({
            listadoCanciones: listadoCanciones,
            listadoAlbums: listadoAlbums
        })

        console.log(listadoCanciones)
        console.log(listadoAlbums)
    }

    render() {
        return (
            <>
                <Header />
                <Buscador />
                <main>
                    <h1>Canciones favoritas</h1>

                    <section className="seccion1">
                    {
                        this.state.listadoCanciones.length === 0 ?
                        <p>¡No tiene canciones en sus favoritos!</p> :
                        <>
                            {
                                this.state.listadoCanciones.map((cancion, i) =>
                                <Articulo
                                key={i} 
                                id={cancion.id} 
                                titulo={cancion.titulo} 
                                foto_album={cancion.foto_album}
                                nombre_artista={cancion.nombre_artista} 
                                titulo_album={cancion.titulo_album} 
                                duracion={cancion.duracion} 
                                ranking={cancion.ranking} 
                                />
                                )
                            }
                        </>

                    }
                    </section>
                    <h1>Albumes favoritos</h1>

                    <section className="seccion2">
                    {
                        
                        this.state.listadoAlbums.map((album, i) =>
                        <Articulo
                        key={i} 
                        id={album.id} 
                        titulo={album.titulo} 
                        foto_album={album.foto_album} 
                        nombre_artista={album.nombre_artista} 
                        titulo_album={album.titulo_album} 
                        duracion={album.duracion} 
                        ranking={album.ranking} 
                        />
                        )

                    }
                    </section>
                    </main>
                <Footer />
            </>
        )
    }
}

export default Favoritos;