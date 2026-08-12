import { useState } from "react";
import { getVideos } from "../api/tmdb.js";

function Pelicula({ pelicula }) {

  // ❤️ Guarda la cantidad de likes
  const [likes, setLikes] = useState(0);

  // 📝 Controla si mostramos u ocultamos la descripción
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

  // 🎬 Controla si mostramos u ocultamos el tráiler
  const [mostrarTrailer, setMostrarTrailer] = useState(false);

  // 🎞️ Guarda el tráiler encontrado
  const [trailer, setTrailer] = useState(null);

  return (
    <>
      <div className="pelicula">

        {/* 🎬 Título de la película */}
        <h2>{pelicula.title}</h2>

        {/* 🖼️ Poster de la película */}
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
        />

        {/* ⭐ Puntuación de TMDB */}
        <p>
          ⭐ {pelicula.vote_average.toFixed(1)}
        </p>


        {/* 📝 Si mostrarDescripcion es true, mostramos la descripción */}
        {mostrarDescripcion ? (
          <p className="descripcion">

            {/* Si existe overview la mostramos,
                si no, mostramos el mensaje alternativo */}
            {pelicula.overview
              ? pelicula.overview
              : "Sin descripción disponible."}

          </p>
        ) : null}


        {/* 🔘 Contenedor de los botones */}
        <div className="botones">

          {/* 📝 Botón para mostrar/ocultar descripción */}
          <button
            onClick={() =>
              setMostrarDescripcion(!mostrarDescripcion)
            }
          >
            {mostrarDescripcion
              ? "Ocultar descripción"
              : "Ver descripción"}
          </button>


          {/* ❤️ Botón de Like */}
          <button
            className={likes > 0 ? "liked" : ""}
            onClick={() => setLikes(1)}
            disabled={likes > 0}
          >
            ❤️ {likes > 0 ? "Te gusta" : "Me gusta"}
          </button>


          {/* 🎬 Botón para buscar y mostrar el tráiler */}
          <button
            onClick={async () => {

              // 📡 Pedimos a TMDB los videos de esta película
              const videos = await getVideos(pelicula.id);

              // 🔎 Buscamos el primer tráiler que sea de YouTube
              const videoYouTube = videos.find(
                video =>
                  video.type === "Trailer" &&
                  video.site === "YouTube"
              );

              // 🎞️ Guardamos el tráiler encontrado
              setTrailer(videoYouTube);

              // 👀 Mostramos la sección del tráiler
              setMostrarTrailer(true);
            }}
          >
            Ver película
          </button>

        </div>


        {/* 🎞️ Si mostrarTrailer es true, mostramos el tráiler */}
        {mostrarTrailer ? (
          <div className="trailer">

            {/* 🎬 Si encontramos un tráiler, mostramos YouTube */}
            {trailer ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`Tráiler de ${pelicula.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (

              // ❌ Si TMDB no encontró tráiler
              <p>
                No encontramos tráiler.
                Gracias por llegar hasta aquí, Soy CeleS! ❤️
              </p>
            )}

            {/* ❌ Botón para cerrar el tráiler */}
            <button
              onClick={() => setMostrarTrailer(false)}
            >
              Cerrar
            </button>

          </div>
        ) : null}

      </div>
    </>
  );
}

export default Pelicula;