describe('POST /sessions', () => {

    it('user session', () => {

        const userData = {
            name: 'James Software',
            email: 'james.sf@hotmail.com',
            password: 'james123'
        }

        cy.postSession(userData)
            .then(response => {

                const {user, token} = response.body

                expect(response.status).to.eq(200)
                expect(user.name).to.eq(userData.name)
                expect(user.email).to.eq(userData.email)
                expect(token).not.to.be.empty
            })
    })

    it('Invalid password', () => {

        const user = {
            email: 'james.sf@hotmail.com',
            password: '1234556'
        }

        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })
    })

    it('Email not found', () => {

        const user = {
            email: 'james.sfzz@hotmail.com',
            password: '1234556'
        }

        cy.postSession(user)
            .then(response => {
                expect(response.status).to.eq(401)
            })
    })
})

Cypress.Commands.add('postSession', (user) => {
    cy.api({
        url: '/sessions',
        method: 'POST',
        body: { email: user.email, password: user.password },
        failOnStatusCode: false
    }).then(response => { return response })
})