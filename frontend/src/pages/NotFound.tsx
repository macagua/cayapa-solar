export default function NotFound() {
  return (
    <div className="content-header">
      <div className="error-page">
        <h2 className="headline text-warning">404</h2>

        <div className="error-content">
          <h3>
            <i className="fas fa-exclamation-triangle text-warning"></i> Oops! Página no encontrada.
          </h3>

          <p>
            No pudimos encontrar la página que estás buscando.
            Mientras tanto, puedes <a href="/">volver al inicio</a> o intentar usar el buscador.
          </p>

          <form className="search-form">
            <div className="input-group">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Buscar"
              />

              <div className="input-group-append">
                <button type="submit" name="submit" className="btn btn-warning">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
