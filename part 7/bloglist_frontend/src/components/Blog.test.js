import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />',() => {
  let component
  beforeEach( () => {
    const blog = {
      user:'test',
      author:'Warre Vyncke',
      title: 'How to React',
      url:'http://google.com',
      likes:45
    }
    component= render(
      <Blog blog={blog}/>
    )
  })
  test('renders title and author,but not url or likes',() => {
    const div = component.container.querySelector('.info')
    expect(div).toHaveStyle('display: none')
    expect(component.container).toHaveTextContent('Warre Vyncke')
    expect(component.container).toHaveTextContent('How to React')
  })

})
describe('<Blog /> button testing',() => {
  test('Show url and number of likes when button is clicked', () => {
    const blog = {
      user:'test',
      author:'Warre Vyncke',
      title: 'How to React',
      url:'http://google.com',
      likes:45
    }
    const component = render(
      <Blog blog={blog}/>
    )


    const div = component.container.querySelector('.info')
    const button = component.getByText('View')
    fireEvent.click(button)
    expect(div).toHaveStyle('')
  })
  test('button is clicked twice',() => {
    const blog = {
      user:'test',
      author:'Warre Vyncke',
      title: 'How to React',
      url:'http://google.com',
      likes:45
    }
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} updateHandler={mockHandler}/>
    )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})