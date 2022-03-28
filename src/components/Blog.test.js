import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders notes', () => {
  const blogs = [
    {
      'title': 'First class tests',
      'author': 'Robert C. Martin',
      'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      'likes': 25,
      'user': {
        'username': 'test',
        'id': '623cee3375518a0ca6e9b265'
      },
      'id': '623d2c5902b9e781bcdf6381'
    },
    {
      'title': 'React patterns',
      'author': 'Michael Chan',
      'url': 'https://reactpatterns.com/',
      'likes': 14,
      'user': {
        'username': 'test',
        'id': '623cee3375518a0ca6e9b265'
      },
      'id': '623d2c9172e1014398cd40c2'
    },
    {
      'title': 't',
      'author': 't',
      'url': 't',
      'likes': 0,
      'user': {
        'username': 'test',
        'id': '623cee3375518a0ca6e9b265'
      },
      'id': '623e4301de409ad275278638'
    }
  ]
  window.localStorage.setItem('loggedUser','{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYyM2NlZTMzNzU1MThhMGNhNmU5YjI2NSIsImlhdCI6MTY0ODQ4ODc1NCwiZXhwIjoxNjQ4NDkyMzU0fQ.JC5HNFB-Z81oKBD3RsoF73yGV4PBEK3WzpYpNs2GEFI","username":"test"}')
  const { container } = render(<Blog blog = {blogs[1]} blogs={blogs}/>)
  const div = container.querySelector('.blog')
  window.localStorage.removeItem('loggedUser')
  expect(div).toHaveTextContent('React patterns')
  //const element = screen.getAllByText('First class tests Robert C. Martin')
  //expect(element).toBeDefined()
})
