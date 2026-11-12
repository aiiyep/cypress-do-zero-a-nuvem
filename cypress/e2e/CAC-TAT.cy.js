describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => cy.visit('./src/index.html'))

  it('verifica o titulo da aplicacao', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName')
      .as('nome')
      .type('Gabriel')
    cy.get('@nome')
      .should('have.value', 'Gabriel')

    cy.get('#lastName')
      .as('sobrenome')
      .type('Gonçalves')
    cy.get('@sobrenome')
      .should('have.value', 'Gonçalves')

    cy.get('#email')
      .as('email')
      .type('gabriel@gmail.com')
    cy.get('@email')
      .should('have.value', 'gabriel@gmail.com')

    cy.get('#phone')
      .as('telefone')
      .type('99999999')
    cy.get('@telefone')
      .should('have.value', '99999999')

    cy.get('#product')
      .as('produto')
      .select('YouTube')
    cy.get('@produto')
      .should('have.value', 'youtube')

    cy.get('#open-text-area')
      .as('areaTexto')
      .type('Muito Bom', { delay: 0 })
    cy.get('@areaTexto')
      .should('have.value', 'Muito Bom')

    cy.get('button[type="submit"]')
      .as('btn')
      .click()


    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName')
      .as('nome')
      .type('Gabriel')
    cy.get('@nome')
      .should('have.value', 'Gabriel')

    cy.get('#lastName')
      .as('sobrenome')
      .type('Gonçalves')
    cy.get('@sobrenome')
      .should('have.value', 'Gonçalves')

    cy.get('#email')
      .as('email')
      .type('gabrielfesfse.com')

    cy.get('#open-text-area')
      .as('areaTexto')
      .type('Muito Bom', { delay: 0 })
    cy.get('@areaTexto')
      .should('have.value', 'Muito Bom')

    cy.get('button[type="submit"]')
      .as('btn')
      .click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefonico continua vazio quando preenchido com um valor não numerico', () => {
    cy.get('#phone').type('abcde').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName')
      .as('nome')
      .type('Gabriel')
    cy.get('@nome')
      .should('have.value', 'Gabriel')

    cy.get('#lastName')
      .as('sobrenome')
      .type('Gonçalves')
    cy.get('@sobrenome')
      .should('have.value', 'Gonçalves')

    cy.get('#email')
      .as('email')
      .type('gabriel@gmail.com')
    cy.get('@email')
      .should('have.value', 'gabriel@gmail.com')

    cy.get('#phone-checkbox').check()

    cy.get('#open-text-area')
      .as('areaTexto')
      .type('Muito Bom', { delay: 0 })
    cy.get('@areaTexto')
      .should('have.value', 'Muito Bom')

    cy.get('button[type="submit"]')
      .as('btn')
      .click()

    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .as('nome')
      .type('Gabriel').clear()
    cy.get('@nome')
      .should('have.value', '')

    cy.get('#lastName')
      .as('sobrenome')
      .type('Gonçalves').clear()
    cy.get('@sobrenome')
      .should('have.value', '')

    cy.get('#email')
      .as('email')
      .type('gabriel@gmail.com').clear()
    cy.get('@email')
      .should('have.value', '')

    cy.get('#phone')
      .as('telefone')
      .type('99999999').clear()
    cy.get('@telefone')
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]')
      .as('btn')
      .click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')

    cy.get('#product').should('have.value', 'youtube')
  })


  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')

    cy.get('#product').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)

    cy.get('#product').should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check('feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check().should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#check input')
      .as('contact')
      .each(contactPreference => {
        cy.wrap(contactPreference).check().should('be.checked')
      })
    cy.get('@contact').last().uncheck().should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  Cypress._.times(5, () => {
    it('pausando o tempo e depois avançando 3 segundos', () => {
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible', 'Mensagem enviada com sucesso.')

        cy.tick(3000)
        
        cy.contains('.success', 'Mensagem enviada com sucesso.').should('not.be.visible', 'Mensagem enviada com sucesso.')

    })
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () =>{
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () =>{
    cy.get('#open-text-area')
      .invoke('val', 'FODA PRA KRL')
      .should('have.value', 'FODA PRA KRL')
  })

  it.only('faz uma requisição HTTP', ()=>{

    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
    }).then((getRequest) =>{
        expect(getRequest.status).to.equal(200);
        expect(getRequest.statusText).to.equal('OK');
        expect(getRequest.body).contains('h1', 'CAC TAT')
    })
  })
  
})
