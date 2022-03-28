const LoginForm = ({ setUsername, setPassword, handleLoginForm }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginForm}>
        <div>
                    username <input
            type='text'
            name='Username'
            onChange={({ target }) => { setUsername(target.value) }}
          />
        </div>
        <div>
                    password <input
            type='password'
            name='Password'
            onChange={({ target }) => { setPassword(target.value) }}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm