import React from 'react'
import '@testing-library/jest-dom'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'testing a blog',
    author: 'me',
    url: 'lolol.com',
    likes: 100,
    user: '123',
  }
  const useID = '123'
  let container
  beforeEach(() => {
    container = render(
      <Blog blog={blog} useID={useID} />
    ).container
  })
  test('should renders the blog\'s title and author, but does not render its URL or number of likes by default.', () => {
    const div = container.querySelector('.basicBlogView')
    expect(div).toHaveTextContent('testing a blog')
    expect(div).toHaveTextContent('me')
    const doesRenderUrl = screen.queryByText('lolol.com')
    expect(doesRenderUrl).toBeNull()
    const doesRenderLikes = screen.queryByText('0')
    expect(doesRenderLikes).toBeNull()
  })
  test(' URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const div = container.querySelector('.basicBlogView')
    const user = userEvent.setup()
    const findUrl = screen.queryByText('lolol.com')
    expect(findUrl).toBeNull()
    const findLikes = screen.queryByText('100')
    expect(findLikes).toBeNull()
    const button = screen.getByText('view')
    await user.click(button)
    expect(findUrl).toBeDefined()
    expect(findLikes).toBeDefined()
  })
})