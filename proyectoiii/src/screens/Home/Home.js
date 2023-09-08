import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Articulo from "../../components/Articulo/Articulo";

import "./Home.css";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listadaCanciones : [],
            listadoAlbums : []
        }
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&limit=5")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    listadaCanciones: data.data
                })
            })
            .catch(error => console.log(error))

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums&limit=5")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    listadoAlbums: data.data
                })
            })
            .catch(error => console.log(error))
    }
    
    render() {
        return (
            <>
                <Header />
                <Buscador />
                <main>
                    <h1>Top 5 canciones</h1>
                    <section className="seccion1">
                        {
                            this.state.listadaCanciones.map((cancion, i) => <Articulo key={i} id={cancion.id} titulo={cancion.title} foto_album={cancion.album.cover_medium} nombre_artista={cancion.artist.name} titulo_album={cancion.album.title} duracion={cancion.duracion} ranking={cancion.rank} />)
                        }
                        <p></p>
                    </section>
                    <h1>Top 5 albums</h1>
                    <section className="seccion2">
                        {
                            this.state.listadoAlbums.map((album, i) => <Articulo key={i} id={album.id} titulo={album.title} foto_album={album.cover_medium} nombre_artista={album.artist.name} titulo_album={null} duracion={null} ranking={null} />)
                        }
                    </section>
                </main>
                <Footer />
            </>
        );
    }
};

export default Home;