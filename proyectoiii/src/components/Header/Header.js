import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
    return (
        <header>
           <img src="../img/spotify.jpg" alt="Logo de la app" />
           <h1>Musiqué</h1>
           <nav className="navegacion">
                <ul className="lista">
                    <li className="recuadro"><Link to={"/"}>Home</Link></li>
                    <li className="recuadro"><Link to={"/favoritos"}>Favoritos</Link></li>
                    <li className="recuadro"><Link to={"/ver-todas-las-canciones"}>Ver todas las canciones</Link></li>
                    <li className="recuadro"><Link to={"/ver-todos-los-albumes"}>Ver todos los álbumes</Link></li>
                </ul>
           </nav>
        </header>
    );
}

export default Header;