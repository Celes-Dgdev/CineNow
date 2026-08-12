import { useState } from "react";

function Login ({ onLogin }) {

  // 👤 Guarda el usuario que escribe la persona
  const [usuario, setUsuario] = useState("");

  // 🔒 Guarda la contraseña
  const [password, setPassword] = useState("");

  // ❌ Guarda el mensaje de error del login
const [error, setError] = useState("");

const [modoRegistro, setModoRegistro] = useState(false);

  return (
    // creamos un formulario de login con inputs para usuario y contraseña
    // y un botón para enviar el formulario

   <form
  className="login"
  onSubmit={(e) => {
    e.preventDefault();

    if (modoRegistro) {

      // 📝 Comprobamos que los campos tengan información
      if (!usuario.trim() || !password.trim()) {
        setError("Debes escribir un usuario y una contraseña");
        return;
      }

      // 📝 Guardamos el usuario y contraseña
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("password", password);

      alert(`🎬 ¡Creaste tu cuenta! ¡Bienvenido ${usuario} a CineNow!`);

      setModoRegistro(false);

    } else {

      // 🔐 Recuperamos los datos guardados
      const usuarioGuardado = localStorage.getItem("usuario");
      const passwordGuardada = localStorage.getItem("password");

      if (
        usuario === usuarioGuardado &&
        password === passwordGuardada
      ) {

        alert(`🎬 ¡Bienvenido de nuevo a CineNow, ${usuario}!`);

        onLogin();

      } else {

        setError("Usuario o contraseña incorrectos");

      }
    }
  }}
  
>
  <h2>
    {modoRegistro ? "Crear cuenta" : "Iniciar sesión"}
  </h2>

  {/* 👤 Input del usuario */}
  <input
    type="text"
    placeholder="Usuario"
    value={usuario}
    onChange={(e) => setUsuario(e.target.value)}
  />

  {/* 🔒 Input de contraseña */}
  <input
    type="password"
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  {/* ❌ Mostramos el error si existe */}
  {error && <p className="error">{error}</p>}

  {/* 🎬 Botón principal */}
  <button>
    {modoRegistro ? "Registrarse" : "Entrar"}
  </button>

  {/* 🔄 Cambiar entre login y registro */}
  <button
    type="button"
    onClick={() => setModoRegistro(!modoRegistro)}
  >
    {modoRegistro
      ? "Ya tengo una cuenta"
      : "Crear una cuenta"}
  </button>

</form> );
}

export default Login;