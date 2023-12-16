

describe('POST /users', () => {

  it('register a new user', () => {

    //Massa de teste que vai ser utilizada para realização da requisição
    const user = {
      name: 'Iago Oliveira',
      email: 'iago@hotmail.com',
      password: 'iago123'
    }

    //Realiza a exclusão do email cadastrado via API, configurado via banco de dados, busca no banco e realiza a exclusão.
    cy.task('deleteUser', user.email)


    //Request do tipo POST que está sendo utilizada para realizar o cadastro
    cy.api({
      url: '/users',
      method: 'POST',
      body: user,
      failOnStatusCode: false

    }).then(response => {
      expect(response.status).to.eq(200)
      cy.log(JSON.stringify(response.body))
    })
  })
})