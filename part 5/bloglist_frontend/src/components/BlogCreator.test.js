import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogCreator from './BlogCreator'

describe('<BlogCreator />',() => {
  test('form calls event handler it received as props',() => {
    const createBlog = jest.fn()
    const component = render(
      <BlogCreator createBlog={createBlog} />
    )
    const inputAuthor = component.container.querySelector('#author')
    const inputTitle = component.container.querySelector('#title')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    fireEvent.change(inputAuthor, {
      target: { value: 'Warre Vyncke' }
    })
    fireEvent.change(inputTitle, {
      target: { value: 'React' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'google.be' }
    })
    fireEvent.submit(form)
    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0].title).toBe('React')
    expect(createBlog.mock.calls[0][0].author).toBe('Warre Vyncke')
    expect(createBlog.mock.calls[0][0].url).toBe('google.be')


  })

})