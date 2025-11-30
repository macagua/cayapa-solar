import { APP_NAME, APP_VERSION } from '@utils/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="main-footer">
      <div className="float-right d-none d-sm-inline">
        <b>Versión</b> {APP_VERSION}
      </div>
      <strong>
        Copyright &copy; {currentYear}{' '}
        <a href="https://madridsolar.com">Madrid Solar</a>.
      </strong>{' '}
      Todos los derechos reservados.
    </footer>
  )
}
