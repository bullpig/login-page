import { useState } from 'react'
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../contexts/AuthContext'

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

const defaultValue: FormData = {
  email: 'admin@gmail.com',
  password: 'Password123!',
  rememberMe: false,
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, error } = useAuth()

  const schema = yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .required('Vui lòng nhập email')
        .email('Email không hợp lệ'),
      password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký'),
      rememberMe: yup.boolean(),
    })
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
    resolver: schema,
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = (data: any) => {
    setLoading(true)
    if (Object.keys(errors).length === 0) {
      setTimeout(() => {
        login(data)
        setLoading(false)
      }, 1000)
    }
  }

  return (
    <div className="login-container">
      <div className="logo">
        <img src="./logo.jpeg" alt="" />
      </div>
      <div className="auth">
        <div className="form-container">
          <div className="header">
            <h1 className="title">Đăng nhập</h1>
            <div className="sub-title">
              Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp
              lý tưởng
            </div>
          </div>
          <div className="form-login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-input">
                <label htmlFor="email" className="text-input-label">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="Nhập email của bạn"
                    />
                  )}
                />
                {errors.email && (
                  <div className="error-message">{errors.email?.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="text-input-label">
                  Mật khẩu
                </label>
                <div className="password-container">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        className="password-input"
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-button"
                  >
                    {showPassword ? (
                      <EyeSlashFill size={18} color="#5d6675" />
                    ) : (
                      <EyeFill size={18} color="#5d6675" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="error-message">
                    {errors.password?.message}
                  </div>
                )}
                {!errors.email && !errors.password && error && (
                  <div className="error-message">{error}</div>
                )}
              </div>

              <div className="checkbox-container">
                <div className="checkbox-remember">
                  <label className="checkbox-label">
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          value="1"
                          checked={field.value ? true : false}
                        />
                      )}
                    />
                    Duy trì đăng nhập
                  </label>
                </div>
                <div className="text-forgot-pw">
                  <a href="/#">Quên mật khẩu?</a>
                </div>
              </div>
              <div>
                <button disabled={loading} className="btn-submit" type="submit">
                  {loading ? (
                    <div className="loader"></div>
                  ) : (
                    <div>Đăng nhập</div>
                  )}
                </button>
              </div>
            </form>
            <div className="another-login">
              <div className="title">Hoặc tiếp tục với:</div>
              <div className="logo-container">
                <div className="item">
                  <img src="./facebook-logo.png" alt="Logo Facebook" />
                  Facebook
                </div>
                <div className="item">
                  <img src="./google-logo.png" alt="Logo Google" />
                  Google
                </div>
                <div className="item">
                  <img src="./linkedin-logo.png" alt="Logo LinkedIn" />
                  Linkedin
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="link-register">
        Chưa có tài khoản?
        <a href="/#">Đăng ký</a>
      </footer>
    </div>
  )
}

export default Login
