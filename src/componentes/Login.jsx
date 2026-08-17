import { useState } from "react";

function Login({ onLogin }) {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);

  return (
    <div className="box">

      <form

  
        className="login"
        onSubmit={(e) => {
          e.preventDefault();

          if (modoRegistro) {

            if (!usuario.trim() || !password.trim()) {
              setError("Debes escribir un usuario y una contraseña");
              return;
            }

            localStorage.setItem("usuario", usuario);
            localStorage.setItem("password", password);

            alert(
              `🎬 ¡Creaste tu cuenta! ¡Bienvenido ${usuario} a CineNow!`
            );

            setError("");
            setModoRegistro(false);

          } else {

            const usuarioGuardado =
              localStorage.getItem("usuario");

            const passwordGuardada =
              localStorage.getItem("password");

            if (
              usuario === usuarioGuardado &&
              password === passwordGuardada
            ) {

              alert(
                `🎬 ¡Bienvenido de nuevo a CineNow, ${usuario}!`
              );

              setError("");
              onLogin();

            } else {

              setError("Usuario o contraseña incorrectos");

            }
          }
        }}
      >
<h1>
CineNow!
</h1>
<p>¡Bienvenido a mi App de películas en estreno.</p>
        {/* TÍTULO */}
        <h2>
          {modoRegistro
            ? "Crear cuenta"
            : "Iniciar sesión"}
        </h2>

        {/* TODO EL FORMULARIO */}
        <div className="form-content">

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button type="submit">
            {modoRegistro
              ? "Registrarse"
              : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => {
              setModoRegistro(!modoRegistro);
              setError("");
            }}
          >
            {modoRegistro
              ? "Ya tengo una cuenta"
              : "Crear una cuenta"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default Login;