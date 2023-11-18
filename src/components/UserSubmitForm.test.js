import React from 'react'
import { render,screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserSubmitForm from './UserSubmitForm'
import userEvent from '@testing-library/user-event'

describe('<UserSubmitForm/>', () => {
  test('should check, that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createNew = jest.fn()
    const user = userEvent.setup()

    const userId = '123'
    const likes = '13'

    render(<UserSubmitForm createBlog={createNew} userId={userId}/>)

    const inputTitle = screen.getByPlaceholderText('enter title here')
    await user.type(inputTitle, 'TitleTest')
    const inputAuthor = screen.getByPlaceholderText('enter author here')
    await user.type(inputAuthor, 'AuthorTest')
    const inputUrl = screen.getByPlaceholderText('enter url here')
    await user.type(inputUrl, 'UrlTest')
    const inputLikes = screen.getByPlaceholderText('enter likes here')
    await user.type(inputLikes, likes)
    const sendButton = screen.getByText('save')
    await user.click(sendButton)
    console.log(createNew.mock.calls)
    expect(createNew.mock.calls).toHaveLength(1)
    expect(createNew.mock.calls[0][0].title).toBe('TitleTest')
    expect(createNew.mock.calls[0][0].author).toBe('AuthorTest')
    expect(createNew.mock.calls[0][0].url).toBe('UrlTest')
    expect(createNew.mock.calls[0][0].likes).toBe(likes)
    expect(createNew.mock.calls[0][0].user).toBe(userId)
  })
})