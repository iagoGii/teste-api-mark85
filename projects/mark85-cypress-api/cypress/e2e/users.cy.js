

describe('POST /users', () => {

  it('register a new user', () => {

    //Massa de teste que vai ser utilizada para realização da requisição
    const user = {
      name: 'James Software',
      email: 'james.sf@hotmail.com',
      password: 'james123'
    }

    //Realiza a exclusão do email cadastrado via API, configurado via banco de dados, busca no banco e realiza a exclusão.
    cy.task('deleteUser', user.email)

    //encapsulamento da requisição POST
    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(200)
      })

  })

  it('Duplicate email', () => {

    const user = {
      name: 'James Gunn',
      email: 'jamesgunn@hotmail.com',
      password: 'james333'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)

    cy.postUser(user)
      .then(response => {

        const { message } = response.body

        expect(response.status).to.eq(409)
        expect(message).to.eq('Duplicated email!')
      })

  })

  context('Required fields', () => {

    // beforeEach é um gancho onde reinicia a massa de teste e realiza a devida automação conforme descrit nos cenários. 
    let user;

    beforeEach(() => {
      user = {
        name: 'Margot Robbie',
        email: 'margot@gmail.com',
        password: 'pwd123'
      }
    })

    it('name is required', () => {

      delete user.name

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"name\" is required')
        })
    })

    it('email is required', () => {

      delete user.email

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"email\" is required')
        })
    })

    it('password is required', () => {

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
