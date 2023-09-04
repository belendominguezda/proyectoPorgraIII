import React, {Component} from "react";
//ESTE COMPONENTE TRAE LA API DEL TOP 10 ARTISTAS CON SUS ALLBUMES, GENEROS, ETC. (sería como el "global")

class ListadoArtistas extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: null
        }
    }
    componentDidMount(){
        fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&top?limit=10')
        .then (response => response.json())
        .then (datos => {
            this.setState({data: datos.data})
        })
        .catch(error => console.log(error))
    }
    render(){
        console.log("Me monté")
        console.log(this.state)

        return(
            <div>
                {this.state.data === null ?
                <h3>Cargando...</h3> :
                <h3>{this.state.data[8].title}</h3>} 
            </div> //Aca despues voy a tener que usar MAP para filtrar la info y recorrer el array que me trae la API
        )

    }
}

export default ListadoArtistas