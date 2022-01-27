
// definir a suíte de testes (no caso, home page é o nome da suíte):
describe('home page', ()=>{
    // it é a palavra reservada para definir um caso de teste
    it('app deve estar online', ()=>{
        // cy é o comando do cypress para ter acesso aos recursos do framework

        // viewport serve para mudar a resolução da aplicação na tela (no caso, para full hd)
        cy.viewport(1440, 900)

        // visit é uma função em js para o cypress que recebe um argumento, no caso o endereço que a aplicação deve acessar
        cy.visit('https://buger-eats.vercel.app')

        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
    })
})