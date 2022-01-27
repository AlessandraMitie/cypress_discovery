import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import { beforeRequest } from 'har-validator'

// describe é a palavra reservada para criar a suíte de teste. Cadastro é o nome da suíte de teste
describe('Signup', ()=>{

    // Ganchos:
    // before(function() {
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    // })

    // beforeEach(function() {
    //     cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste ')
    // })

    // after(function() {
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
    // })

    // afterEach(function() {
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
    // })

    // beforeEach(function() {
    //     cy.fixture('deliver').then((d)=>{
    //         this.deliver = d
    //     })

        // a função fixture vai obter a massa de teste
        //essa função trabalha de forma síncrona, então precisa cumprir uma promessa. E quando isso acontece no JS, precisa chamar a subfunção .then pra pegar o resultado da promessa. Neste caso, vai pegar o resultado da massa de teste
        // this é uma palavra reservada pra criar uma variável de contexto, neste caso é a variável deliver. O valor armazenado nessa varíavel é o resultado de d, que no caso é a massa de teste de deliver.json que vai ser recebida através do cumprimento da promessa
    //})

    // it é a palavra reservada para criar o caso de teste
    it('User should be deliver', function() {

        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function(){

        var deliver = signupFactory.deliver()

        deliver.cpf = '00000000XXX'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')        
    })

    it('Incorrect email', function(){

        var deliver = signupFactory.deliver()

        deliver.email = 'papito.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')        
    })

    context('Required fields', function(){
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
})