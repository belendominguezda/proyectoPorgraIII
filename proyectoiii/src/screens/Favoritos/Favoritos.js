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