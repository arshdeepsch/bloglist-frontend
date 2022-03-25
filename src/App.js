import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import CreateBlog from './components/CreateBlog';

function Notification({ message, setMessage }) {
  return (
    <div style={message.styleObj}>
      {message.message}
    </div>
  );
}

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    message: null,
    styleObj: null,
  });

  const LoginFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((fblog, sblog) => sblog.likes - fblog.likes);
      setBlogs(blogs);
    });
    return () => { setBlogs(null); };
  }, []);

  useEffect(() => {
    blogService.getUser().then((user) => { if (user !== null) { setUser(user); } });
    return () => { setUser(null); };
  }, []);

  const handleLoginForm = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('/api/login', {
        username, password,
      });

      setUsername('');
      setPassword('');
      window.localStorage.setItem('loggedUser', JSON.stringify(result.data));
      setUser(result.data);
      blogService.setToken(result.data.token);
    } catch (error) {
      setMessage({
        message: 'invalid username or passwod',
        styleObj: {
          textAlign: 'center',
          fontSize: 25,
          padding: 20,
          backgroundColor: 'gray',
          borderRadius: 5,
          borderWidth: 5,
          color: 'red',
          borderStyle: 'solid',
        },
      });
      setTimeout(() => {
        setMessage({ message: null, styleObj: null });
      }, 3000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification
          message={message}
          setMessage={setMessage}
        />
        <Toggleable buttonLabel="login">
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            handleLoginForm={handleLoginForm}
          />
        </Toggleable>
      </div>
    );
  }
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
          window.localStorage.removeItem('loggedUser');
          setUser(null);
          blogService.setToken('');
        }}
        >
          logout
        </button>
      </div>
      <div>
        <Toggleable buttonLabel="new blog" ref={LoginFormRef}>
          <CreateBlog
            blogs={blogs}
            setBlogs={setBlogs}
            setMessage={setMessage}
            LoginFormRef={LoginFormRef}
          />
        </Toggleable>
      </div>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />)}
    </div>
  );
}

export default App;
