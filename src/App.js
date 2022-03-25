import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'


const Notification = ({ message, setMessage }) => {
  return (
    <div style={message.styleObj}>
      {message.message}
    </div>
  )
}


const Login = ({ setUsername, username, setPassword, password, setUser, setMessage }) => {
  const handleForm = async (event) => {
    event.preventDefault()
    try {
      const result = await axios.post('/api/login', {
        username, password
      })
      setUsername('')
      setPassword('')
      setUser(result.data)
      blogService.setToken(result.data.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(result.data))
    } catch (error) {
      setMessage({
        message: `invalid username or passwod`,
        styleObj: {
          textAlign: 'center',
          fontSize: 25,
          padding: 20,
          backgroundColor: 'gray',
          borderRadius: 5,
          borderWidth: 5,
          color: 'red',
          borderStyle: 'solid'
        }
      })
      setTimeout(() => {
        setMessage({ message: null, styleObj: null })
      }, 3000)
    }
  }

  return (
    <div>
      <form onSubmit={handleForm}>
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

const CreateNew = ({ title, setTitle, author, setAuthor, url, setUrl, blogs, setBlogs, setMessage }) => {
  const handleForm = async (event) => {
    event.preventDefault()
    const newBlog = {
      title, author, url
    }
    const result = await blogService.create(newBlog)
    const newBlogs = blogs.concat(result.data)
    setBlogs(newBlogs)
    setMessage({
      message: `added ${result.data.title} by ${result.data.author}`,
      styleObj: {
        textAlign: 'center',
        fontSize: 25,
        padding: 20,
        backgroundColor: 'gray',
        borderRadius: 5,
        borderWidth: 5,
        color: 'green',
        borderStyle: 'solid'
      }
    })
    setTimeout(() => {
      setMessage({ message: null, styleObj: null })
    }, 3000)
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleForm}>
        <div>title: <input type='text' onChange={({ target }) => { setTitle(target.value) }} /></div>
        <div>author: <input type='text' onChange={({ target }) => { setAuthor(target.value) }} /></div>
        <div>url: <input type='text' onChange={({ target }) => { setUrl(target.value) }} /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({
    message: null,
    styleObj: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    blogService.getUser().then(user => { if (user !== null) { setUser(user) } })
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification
          message={message}
          setMessage={setMessage}
        />
        <Login
          setUsername={setUsername}
          username={username}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setMessage={setMessage}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification
          message={message}
          setMessage={setMessage}
        />
        <div>
          <b>{`${user.username} logged in`}</b>
          <button onClick={() => {
            window.localStorage.removeItem('loggedUser')
            setUser(null)
            blogService.setToken('')
          }}>logout</button>
        </div>
        <div>
          <CreateNew
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            blogs={blogs}
            setBlogs={setBlogs}
            setMessage={setMessage}
          />
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App