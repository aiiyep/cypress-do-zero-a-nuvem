# 🌲 Cypress, do Zero à Nuvem ☁️

![Cypress](https://img.shields.io/badge/Cypress-16-17202C?logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

Projeto de **testes automatizados end-to-end (E2E)** com [Cypress](https://www.cypress.io/), feito durante o curso **"Cypress, do Zero à Nuvem"** da [Escola Talking About Testing](https://www.udemy.com/course/testes-automatizados-com-cypress-basico/).

A aplicação testada é a **CAC TAT (Central de Atendimento ao Cliente TAT)**, um formulário web de contato que está na pasta [`src/`](./src).

## 🎯 O que foi testado

A suíte em [`cypress/e2e/CAC-TAT.cy.js`](./cypress/e2e/CAC-TAT.cy.js) cobre:

- **Envio do formulário:** envio com sucesso preenchendo os campos obrigatórios, e mensagens de erro quando faltam campos obrigatórios ou o e-mail tem formato inválido
- **Regras de negócio:** o telefone passa a ser obrigatório quando o usuário escolhe esse meio de contato, e o campo de telefone não aceita valores não numéricos
- **Elementos de formulário:** campos de texto, listas suspensas (`select`) por texto, valor e índice, botões de rádio e checkboxes
- **Upload de arquivos:** seleção normal, simulação de *drag-and-drop* e uso de *fixture* com alias
- **Controle do tempo:** uso de `cy.clock()` e `cy.tick()` para verificar que as mensagens somem depois de 3 segundos, com o teste repetido 5 vezes via `Cypress._.times()`
- **Manipulação do DOM:** uso de `.invoke()` para exibir e ocultar elementos e preencher a área de texto
- **Requisição HTTP:** validação de status e resposta com `cy.request()`

## 🛠️ Técnicas e boas práticas

- **Comando customizado:** `cy.fillMandatoryFieldsAndSubmit()` em [`cypress/support/commands.js`](./cypress/support/commands.js), que evita repetir código
- **Fixtures** para os arquivos de teste
- **Integração contínua:** os testes rodam automaticamente com **GitHub Actions** a cada `push` ([`.github/workflows/ci.yml`](./.github/workflows/ci.yml))
- **Cypress Cloud:** os resultados das execuções do CI são gravados na nuvem

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm (vem junto com o Node.js)
- [Git](https://git-scm.com/)

## 🚀 Como rodar os testes

```bash
# 1. Clone o repositório
git clone https://github.com/aiiyep/cypress-do-zero-a-nuvem.git
cd cypress-do-zero-a-nuvem

# 2. Instale as dependências
npm install

# 3a. Abra o Cypress no modo interativo
npm run cy:open

# 3b. Ou rode os testes em modo headless (terminal)
npm test
```

> O script `npm run test:cloud` grava a execução no Cypress Cloud. Para usá-lo, é preciso ter a variável `CYPRESS_RECORD_KEY` configurada.

## 📁 Estrutura do projeto

```
├── .github/workflows/ci.yml   # Pipeline de CI no GitHub Actions
├── cypress/
│   ├── e2e/CAC-TAT.cy.js      # Casos de teste
│   ├── fixtures/              # Arquivos usados nos testes
│   └── support/commands.js    # Comandos customizados
├── src/                       # Aplicação testada (CAC TAT)
└── cypress.config.js          # Configuração do Cypress
```

## 👤 Autor

**Gabriel Gonçalves Lima**, estudante de Sistemas de Informação com foco em QA e automação de testes.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabriel-goncalveslima/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/aiiyep)

---

Projeto baseado no curso de [Walmyr Lima e Silva Filho](https://walmyr.dev/), da Escola Talking About Testing, distribuído sob a licença [MIT](./LICENSE).
