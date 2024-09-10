describe('Teste de carregamento', () => {
  it('carrega corretamente', () => {
    cy.visit('http://localhost:3000/');
    cy.visit('http://localhost:3000/about');
    cy.visit('http://localhost:3000/cars-list');
    cy.visit('http://localhost:3000/car-form');
    cy.visit('http://localhost:3000/404');
  })

  it('GET com sucesso para a API', () => {
    cy.request('http://localhost:5000/cars').then((res) => {
      expect(res).to.have.property('headers')
      expect(res).to.have.property('duration')
      expect(res).to.have.property('body')
    })
  })
})