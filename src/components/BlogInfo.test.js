import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogInfo from './BlogInfo'
describe('', () => {
  const blog = {
    title: 'testing a blog',
    author: 'me',
    url: 'lolol.com',
    likes: 100,
    user: {
      id: '123',
      name: 'me',
      username: 'mememe',
    },
  }
  const addedBy = 'meme'
  const useID = '121'
  const mockHandler = jest.fn()
  let container
  beforeEach(() => {
    container = render(
      <BlogInfo
        blog={blog}
        addedBy={addedBy}
        id={blog.user}
        useID={useID}
        likesUpdater={mockHandler}
      />,
    ).container
  })
  test('c', async () => {
    const div = container.querySelector('.advancedBlogView')
    screen.debug(div)
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    render(div)
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
