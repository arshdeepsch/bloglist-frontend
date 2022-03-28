import axios from 'axios'
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const [bool, setBool] = useState(false)
  const toggleVisible = () => {
    setVisible(!visible)
  }
  const handleLike = async () => {
    const result = await axios.patch(`/api/blogs/${blog.id}`, { likes: (blog.likes + 1) })
    const index = blogs.findIndex((blog) => (blog.id === result.data.id))
    const copy = blogs
    copy[index].likes = result.data.likes
    setBlogs(copy)
    setBool(!bool)
  }

  const handleRemove = async () => {
    const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (conf) {
      await blogService.remove(blog)
      const copy = blogs.filter((b) => (b.id !== blog.id))
      setBlogs(copy)
      setBool(!bool)
    }
  }

  const showVisible = { display: visible ? '' : 'none' }
  const hideVisible = { display: visible ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const user = () => {
    let user = window.localStorage.getItem('loggedUser')
    user = JSON.parse(user)
    return user
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideVisible}>
        {blog.title}
        {' '}
        {blog.author}
        {' '}
        <button onClick={toggleVisible}>view</button>
      </div>
      <div style={showVisible}>
        <div>
          {blog.title}
          {' '}
          {blog.author}
          {' '}
          <button onClick={toggleVisible}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes
          {blog.likes}
          {' '}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.username}</div>
        {(blog.user.username === user().username) && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog