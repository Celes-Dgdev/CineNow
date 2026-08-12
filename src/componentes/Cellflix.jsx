import { useEffect, useState } from "react";
import Pelicula from "./Pelicula";
import { obtenerPeliculas } from "../api/tmdb";

function Cellflix() {

  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {

  // 📡 Pedimos las películas a TMDB
  obtenerPeliculas().then((datos) => {

    // 📦 Guardamos las películas recibidas
    setPeliculas(datos);

  });

}, []); // [] = ejecutar una sola vez

const peliculasFiltradas = peliculas.filter((pelicula) =>
  pelicula.title
    .toLowerCase()
    .includes(busqueda.toLowerCase().trim())
);
  return (
    <>
    <div>
      <h1>CineNow!!</h1>

<p className="bienvenida">
  🎬 Bienvenido a CineNow — descubre las mejores películas de estreno.
</p>
      <button
      className="cerrar-cuenta"
  onClick={() => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("password");
    window.location.reload();
  }}
>
  Cerrar cuenta
</button>
    </div>



      {/* 🔎 Buscador */}
      <input
        type="text"
        placeholder="Buscar película..."
        value={busqueda}

        // ✍️ Cada vez que escribimos,
        // actualizamos el estado busqueda
        onChange={(e) => setBusqueda(e.target.value)}
      />


      {/* 🎬 Contenedor de todas las películas */}
      <div className="peliculas">

        {/* 
          Si encontramos películas:
          → usamos map() para crear un componente Pelicula por cada una.

          Si no encontramos:
          → mostramos el mensaje.
        */}
        {peliculasFiltradas.length > 0

          ? peliculasFiltradas.map((pelicula) => (

              // 🎬 Componente Pelicula
              // key identifica cada película dentro de la lista
              <Pelicula
                key={pelicula.id}
                pelicula={pelicula}
              />

            ))

          : (

            // ❌ No encontramos películas
            <p>
              No encontramos películas con ese nombre.
              Gracias por usar nuestro servicio.
              Soy Celes. ❤️
            </p>

          )
        }

      </div>


    </>
  );
}

export default Cellflix;


