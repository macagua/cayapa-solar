export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="main-footer">
      <div className="float-right d-none d-sm-inline">
        <b>Versión</b> 1.0.0
      </div>
      <strong>
        Copyright &copy; {currentYear}{' '}
        <a href="https://cayapa-solar.com">Cayapa Solar</a>.
      </strong>{' '}
      Todos los derechos reservados.
    </footer>
  )
}
