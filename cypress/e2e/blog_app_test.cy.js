describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testingCypress',
      password: '123456',
      name: 'cypress',
    })
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testingCypress2',
      password: '1234567',
      name: 'cypress2',
    })
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })
  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#username').type('testCypress', { force: true })
      cy.get('#password').type('wrong', { force: true })
      cy.contains('login').click()
      cy.get('.error').wait(1000).contains('Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testingCypress', { force: true })
      cy.get('#password').type('123456', { force: true })
      cy.contains('login').click()
      cy.contains('cypress has logged in')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('testingCypress', { force: true })
      cy.get('#password').type('123456', { force: true })
      cy.contains('login').click()
      cy.contains('cypress has logged in')
    })
    it('A blog can be created and liked', function () {
      cy.contains('LogOut')
      cy.contains('Add blog')
      cy.contains('Add blog').click()
      cy.get('#blogTitle').type('Cypress is creating a new blog')
      cy.get('#blogAuthor').type('Me')
      cy.get('#blogUrl').type('cypress.com')
      cy.get('#blogLikes').type('140')
      cy.get('#saveBlog').click()
      cy.get('.notification').contains(
        'Cypress is creating a new blog by author Me added to the blog',
      )
      cy.contains('Cypress is creating a new blog')
      cy.contains('Me')
      cy.contains('view').click()
      cy.get('.likeButton').click().wait(1000)
      cy.contains('141')
    })
  })
})
describe('Test if user can delete the blog of another user', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testingCypress',
      password: '123456',
      name: 'cypress',
    })
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testingCypress2',
      password: '1234567',
      name: 'cypress2',
    })
    cy.visit('http://localhost:5173')
  })
  it('login as User 1; create a note; verify if delete button exists; logout; login as user 2; verify if delete button does not exist', function () {
    cy.get('#username').type('testingCypress', { force: true })
    cy.get('#password').type('123456', { force: true })
    cy.contains('login').click()
    cy.contains('cypress has logged in')
    cy.contains('LogOut')
    cy.contains('Add blog')
    cy.contains('Add blog').click()
    cy.get('#blogTitle').type('Cypress is creating a new blog')
    cy.get('#blogAuthor').type('Me')
    cy.get('#blogUrl').type('cypress.com')
    cy.get('#blogLikes').type('140')
    cy.get('#saveBlog').click()
    cy.get('.notification').contains(
      'Cypress is creating a new blog by author Me added to the blog',
    )
    cy.contains('Cypress is creating a new blog')
    cy.contains('Me')
    cy.contains('view').click()
    cy.contains('delete').should('exist')
    cy.contains('LogOut').click()
    cy.get('#username').type('testingCypress2', { force: true })
    cy.get('#password').type('1234567', { force: true })
    cy.contains('login').click()
    cy.contains('cypress2 has logged in')
    cy.contains('LogOut')
    cy.contains('Cypress is creating a new blog')
    cy.contains('Me')
    cy.contains('view').click()
    //5.22
    cy.contains('delete').should('not.exist')
    cy.contains('LogOut').click()
    cy.get('#username').type('testingCypress', { force: true })
    cy.get('#password').type('123456', { force: true })
    cy.contains('login').click()
    cy.contains('cypress has logged in')
    cy.contains('LogOut')
    cy.contains('Add blog')
    cy.contains('Cypress is creating a new blog')
    cy.contains('Me')
    cy.contains('view').click()
    //5.21
    cy.contains('delete').click()
    cy.contains('Cypress is creating a new blog').should('not.exist')
    cy.contains('Me').should('not.exist')
  })
})
describe('Check if the blogs created are ordered according to the number of likes', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testingCypress',
      password: '123456',
      name: 'cypress',
    })
    cy.visit('http://localhost:5173')
    cy.get('#username').type('testingCypress', { force: true })
    cy.get('#password').type('123456', { force: true })
    cy.contains('login').click()
    cy.contains('cypress has logged in')
    cy.contains('LogOut')
    cy.contains('Add blog')
    cy.contains('Add blog').click()
    cy.get('#blogTitle').type('The title with the second most likes')
    cy.get('#blogAuthor').type('Me')
    cy.get('#blogUrl').type('cypress.com')
    cy.get('#blogLikes').type('139')
    cy.get('#saveBlog').click()
    cy.get('.notification').contains(
      'The title with the second most likes by author Me added to the blog',
    )
    cy.get('#blogTitle').type('The title with the least likes')
    cy.get('#blogAuthor').type('Me')
    cy.get('#blogUrl').type('cypress.com')
    cy.get('#blogLikes').type('1')
    cy.get('#saveBlog').click()
    cy.get('.notification').contains(
      'The title with the least likes by author Me added to the blog',
    )
    cy.get('#blogTitle').type('The title with the most likes')
    cy.get('#blogAuthor').type('Me')
    cy.get('#blogUrl').type('cypress.com')
    cy.get('#blogLikes').type('140')
    cy.get('#saveBlog').click()
    cy.get('.notification').contains(
      'The title with the most likes by author Me added to the blog',
    )
  })
  it('check likes order', function () {
    cy.get('.basicBlogView')
      .eq(0)
      .should('contain', 'The title with the most likes')
    cy.get('.basicBlogView')
      .eq(1)
      .should('contain', 'The title with the second most likes')
    cy.get('.basicBlogView')
      .eq(2)
      .should('contain', 'The title with the least likes')
  })
})
