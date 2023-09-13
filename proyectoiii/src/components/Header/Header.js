import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
    return (
        <header>
           <img src="../img/spotify.jpg" alt="Logo de la app" /> {/*Opción Logo*/}
           <h1>Nombre de la app</h1> {/*Opción Nombre*/}
           <nav>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/favoritos"}>Favoritos</Link></li>
                    <li><Link to={"/ver-todas-las-canciones"}>Ver todas las canciones</Link></li>
                    <li><Link to={"/ver-todos-los-albumes"}>Ver todos los álbumes</Link></li>
                </ul>
           </nav>
        </header>
    );
}

export default Header;