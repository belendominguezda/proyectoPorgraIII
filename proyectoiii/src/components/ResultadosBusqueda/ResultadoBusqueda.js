import React, { Component } from 'react'

import Header from '../Header/Header'
import Buscador from '../Buscador/Buscador'
import Footer from '../Footer/Footer'
import Articulo from '../Articulo/Articulo'

import './ResultadoBusqueda.css'

class ResultadosBusqueda extends Component {
    constructor(props) {
        super(props)
        this.state = {
            busqueda: this.props.match.params.busqueda,
            resultados: []
        }
    }

    componentDidMount() {
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=${this.props.match.params.busqueda}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    resultados: data.data
                })
            })
            .catch(error => console.log(error))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.busqueda !== this.props.match.params.busqueda) {
            fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=${this.props.match.params.busqueda}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        resultados: data.data
                    })
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <>
                <Header />
                <Buscador />
                {
                    this.state.busqueda !== "" ?
                    <p>{this.state.busqueda}</p> :
                    <p>Cargando...</p>
                }
                {
                    this.state.resultados.length > 0 ?
                    this.state.resultados.map((resultado, i) =>
                        <Articulo
                            key={i}
                            id={resultado.id}
                            titulo={resultado.title}
                            foto_album={resultado.album.cover_medium}
                            nombre_artista={resultado.artist.name}
                            titulo_album={resultado.album.title}
                            duracion={resultado.duration}
                            ranking={resultado.rank}
                        />) :
                    <p>Cargando...</p>
                }
                <Footer />
            </>
        )
    }

}

export default ResultadosBusqueda;