import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs, setMessage, LoginFormRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleForm = async (event) => {
        event.preventDefault()
        const newBlog = {
            title, author, url
        }
        const result = await blogService.create(newBlog)
        const newBlogs = blogs.concat(result.data)
        LoginFormRef.current.toggleVisible()
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

export default CreateBlog
