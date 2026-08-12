// 🔑 Clave de acceso a la API de TMDB
const API_KEY = "f713ce2aa02c82f719aefce4f594d748";

// 🌐 URL base de la API
const BASE_URL = "https://api.themoviedb.org/3";

// 🎬 Obtener películas populares
export async function obtenerPeliculas() {
  try {

    // 📡 Hacemos la petición a TMDB
    const respuesta = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`
    );

    // 📦 Convertimos la respuesta a JSON
    const datos = await respuesta.json();

    // ↩️ Devolvemos las películas
    return datos.results;

  } catch (error) {

    // ❌ Si ocurre un error, lo mostramos
    console.error(error);

    // ↩️ Devolvemos un array vacío
    return [];
  }
}


// 🎞️ Obtener videos de una película
export const getVideos = async (movieId) => {

  // 📡 Pedimos los videos usando el ID de la película
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=es-MX`
  );

  // 📦 Convertimos la respuesta a JSON
  const data = await response.json();

  // ↩️ Devolvemos los videos
  return data.results;
};