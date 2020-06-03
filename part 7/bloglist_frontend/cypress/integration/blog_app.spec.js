describe('Notblog Appe app', function() {
  beforeEach(function(){
    cy.request('POST','http://localhost:3001/api/testing/reset')
    const user ={
      name:'celery',
      username:'celery',
      password:'test'
    }
    cy.request('POST','http://localhost:3001/api/users/',user)
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function() {
    cy.contains('login')
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username:'celery', password:'test' })
    })


    it('A blog can be created',function(){
      cy.contains('new blog').click()
      cy.get('#title').type('an interesting title')
      cy.get('#author').type('an interesting author')
      cy.get('#url').type('interestingurl.com')
      cy.get('#submitButton').click()
      cy.get('#blogs').children().contains('an interesting title')
    })
    describe('and when a blog is created',function(){
      beforeEach(function(){
        cy.createBlog({ title:'an interesting title',author:'an interesting author',url:'interestingurl.com' })
      })
      it('A blog can be liked',function(){
        cy.contains('View').click()
        cy.contains('like').click()
        cy.get('.info').contains('1 likes')
      })
      it('A blog can be deleted',function(){
        cy.contains('View').click()
        cy.contains('delete').click()
        cy.contains('deleted: ')
      })
      it('sorting is done correctly',function(){
        cy.contains('View').click()
        cy.contains('like').click()
        cy.createBlog({ title:'an interesting title 2',author:'an interesting author 2',url:'interestingurl2.com' })
        cy.request('GET','http://localhost:3001/api/blogs')
          .then(({ body }) => {
            expect(body[0].likes).to.be.greaterThan(body[1].likes)
          })
      })
    })

  })
})