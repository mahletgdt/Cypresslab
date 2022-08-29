///<reference types="cypress" />
import Login from "./pageobject/Login/Login"
import Register from "./pageobject/Registration/Register"
import Product from "./pageobject/Product/Product"
import Cart from "./pageobject/Cart/Cart"

describe('Icraft shop Project', () => { 
           let datas;
           let infos ="This email is already registered!!!";


           before(() =>  { 

            cy.fixture("icraftshopdata").then(function(data) {
              datas = data 
              return datas 

            })
           }) 
          


  it('Registation Page', () => {
    cy.visit('http://shop.icraftsoft.net:8095/'); 
     
    const reg= new Register()
    reg.registerButton()
        .should('have.attr', 'value', 'Register',)
        .and('have.attr', 'type', 'submit')
        .click()
      cy.wait(2000)
      reg.usernames()
         .type(datas.name)
         .should('have.value',datas.name)

      reg.emails()
         .type(datas.email)
         .should('have.value',datas.email)   

      reg.submitButton()
      .should('have.attr', 'value', 'Register')
      .and('have.attr', 'type', 'submit') 
      .click() 

      cy.wait(3000) 

      reg.info()
      .invoke('text')
      .should((text2) => {
        expect(infos).not.to.eq(text2) 
       })
       cy.go('back') 
  }) 

  it("Login and Add Product to Cart then order it",() => { 
    cy.visit("http://shop.icraftsoft.net:8095/"); 

    const logs = new Login()
    const pr = new Product()
    const cr = new Cart() 
    
    logs.logins()
        .should('have.attr', 'name', 'userid')
        .and('have.attr', 'type', 'number')
    cy.wait(2000)
    logs.logins().type(datas.loginID)
    logs.loginButton().click() 


    cy.wait(2000)
    cy.get('#myTable_filter > label > .form-control').type('DELL')
    cy.wait(2000)
    cy.selectProduct("FZA") 

    for(let index = 0; index < datas.productName.length; index++) {
       cy.selectProduct(datas.productName[index])
    
      } 

    cr.carts();
  }) 

})