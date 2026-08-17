import { useState } from "react";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!usuario.trim() || !password.trim()) {
      setError("Debes escribir usuario y contraseña");
      return;
    }

    if (modoRegistro) {
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("password", password);

      alert(`🎬 ¡Creaste tu cuenta! ¡Bienvenido ${usuario} a CineNow!`);

      setModoRegistro(false);
      setFormularioAbierto(true);
      setPassword("");
    } else {
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
  };

  const abrirRegistro = () => {
    setModoRegistro(true);
    setFormularioAbierto(true);
    setError("");
  };

  const abrirLogin = () => {
    setModoRegistro(false);
    setFormularioAbierto(true);
    setError("");
  };

  return (
    <div className="login-page">
      <div className={`box ${formularioAbierto ? "open" : ""}`}>
        <div className="login">
          <div className="loginBx">

            {!formularioAbierto ? (
              <div className="inicio-login">
                <h2>🎬 CineNow!</h2>

                <p>Películas en estreno</p>

                <button
                  type="button"
                  onClick={abrirLogin}
                >
                  Iniciar sesión
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={abrirRegistro}
                >
                  Crear cuenta
                </button>
              </div>
            ) : (
              <form onSubmit={manejarSubmit}>
                <h2>
                  <span>🎬</span>
                  {modoRegistro
                    ? "Crear cuenta"
                    : "CineNow"}
                  <span>💙</span>
                </h2>

                <p className="subtitulo">
                  {modoRegistro
                    ? "Únete a CineNow"
                    : "Bienvenido de nuevo"}
                </p>

                <input
                  type="text"
                  placeholder="Usuario"
                  value={usuario}
                  onChange={(e) =>
                    setUsuario(e.target.value)
                  }
                />

                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                {error && (
                  <p className="error">
                    {error}
                  </p>
                )}

                <input
                  type="submit"
                  value={
                    modoRegistro
                      ? "Registrarse"
                      : "Entrar"
                  }
                />

                <div className="group">
                  {!modoRegistro && (
                    <a href="#">
                      ¿Olvidaste tu contraseña?
                    </a>
                  )}

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();

                      if (modoRegistro) {
                        abrirLogin();
                      } else {
                        abrirRegistro();
                      }
                    }}
                  >
                    {modoRegistro
                      ? "Ya tengo una cuenta"
                      : "Crear cuenta"}
                  </a>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;