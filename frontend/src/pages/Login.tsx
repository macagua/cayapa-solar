import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { APP_NAME, ROUTES } from '@utils/constants'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simular login - reemplazar con API real
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      login({
        id: '1',
        name: 'Usuario Admin',
        email,
        role: 'ADMIN',
      })

      navigate(ROUTES.HOME)
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>{APP_NAME.split(' ')[0]}</b> {APP_NAME.split(' ')[1]}
        </div>

        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Inicia sesión para comenzar</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />&nbsp;
                    <label htmlFor="remember">Recordarme</label>
                  </div>
                </div>
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Ingresar'}
                  </button>
                </div>
              </div>
            </form>

            <p className="mb-1 mt-3">
              <a href="#">Olvidé mi contraseña</a>
            </p>
            <p className="mb-0">
              <a href="#" className="text-center">
                Registrar nueva cuenta
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
