describe('template spec', () => {
  it ('recupera corretamente os dados da API', () => {
    cy.request('http://localhost:5000/cars').then((res) => {
        expect(res).to.have.property('headers')
        expect(res).to.have.property('duration')
        expect(res).to.have.property('body')
    })
  })

  it ('cadastra corretamente dados na API', () => {
    const testObj = {
      brand: "test-brand",
      name: "test-name",
      color: "test-color",
      year: "test-year"
    }
    cy.request('POST', 'http://localhost:5000/cars', testObj).then((res) => {
      expect(res.body).to.have.property('brand', testObj.brand)
      expect(res.body).to.have.property('name', testObj.name)
      expect(res.body).to.have.property('color', testObj.color)
      expect(res.body).to.have.property('year', testObj.year)
    })
  })
})