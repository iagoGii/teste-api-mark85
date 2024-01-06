

describe('POST /users', () => {

  beforeEach(function () {
    cy.fixture('users').then(function (users) {
      this.users = users
    })
  })

  it('register a new user', function () {

    //Massa de teste que vai ser utilizada para realização da requisição
    const user = this.users.create

    //Realiza a exclusão do email cadastrado via API, configurado via banco de dados, busca no banco e realiza a exclusão.
    cy.task('removeUser', user.email)

    //encapsulamento da requisição POST
    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(201)
      })

  })

  it('Duplicate email', function () {

    const user = this.users.dup_email

    cy.task('removeUser', user.email)

    cy.postUser(user)

    cy.postUser(user)
      .then(response => {

        const { message } = response.body

        expect(response.status).to.eq(409)
        expect(message).to.eq('Duplicated email!')
      })

  })

  context('Required fields', function () {

    // beforeEach é um gancho onde reinicia a massa de teste e realiza a devida automação conforme descrit nos cenários. 
    let user;

    beforeEach(function () {
      user = this.users.required
    })

    it('name is required', function () {

      delete user.name

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"name\" is required')
        })
    })

    it('email is required', function () {

      delete user.email

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"email\" is required')
        })
    })

    it('password is required', function () {

      delete user.password

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"password\" is required')
        })
    })
  })
})
