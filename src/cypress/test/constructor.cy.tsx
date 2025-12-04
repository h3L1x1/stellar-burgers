describe('Burger Constructor Tests', function () {
  beforeEach(function () {
    cy.intercept('GET', '**/api/ingredients**', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user**', {
      statusCode: 200,
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders**', {
      statusCode: 200,
      fixture: 'order.json'
    }).as('createOrder');

    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'fake-access-token');
      win.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    cy.setCookie('accessToken', 'Bearer fake-access-token');

    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');

    cy.wait('@getIngredients');
  });

  afterEach(function () {
    cy.window().then((win) => {
      win.localStorage.removeItem('accessToken');
      win.localStorage.removeItem('refreshToken');
    });
    cy.clearCookies();
  });

  describe('add ingredients to constructor works correctly', function () {
    it('should add bun', function () {
      cy.get('[data-cy="bun-ingredients"]').contains('Добавить').click();
      cy.get('[data-cy="constructor-bun-1"]')
        .contains('Краторная булка N-200i')
        .should('exist');
      cy.get('[data-cy="constructor-bun-2"]')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('should add ingredient', function () {
      cy.contains('Начинки').click();
      cy.get('[data-cy="mains-ingredients"]').contains('Добавить').click();
      cy.get('[data-cy="constructor-ingredient"]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });
  });

  describe('modal windows functionality', function () {
    it('should open ingredient modal on click', function () {
      cy.get('[data-cy="bun-ingredients"] li').first().click();
      cy.get('#modals [data-cy="modal"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');
    });

    it('should close modal by clicking close button', function () {
      cy.get('[data-cy="bun-ingredients"] li').first().click();
      cy.get('#modals [data-cy="modal"]').should('be.visible');
      cy.get('#modals [data-cy="modal-close-button"]').click();
      cy.get('#modals [data-cy="modal"]').should('not.exist');
    });

    it('should close modal by clicking overlay', function () {
      cy.get('[data-cy="bun-ingredients"] li').first().click();
      cy.get('#modals [data-cy="modal"]').should('be.visible');
      cy.get('#modals [data-cy="modal-overlay"]').click({ force: true });
      cy.get('#modals [data-cy="modal"]').should('not.exist');
    });

    it('should show correct ingredient data in modal', function () {
      cy.get('[data-cy="bun-ingredients"] li').first().click();
      cy.get('#modals [data-cy="modal"]')
        .should('contain', 'Краторная булка N-200i')
        .and('contain', '420')
        .and('contain', '80')
        .and('contain', '24')
        .and('contain', '53');
    });
  });

  describe('order creation process', function () {
    it('should create order and show modal with order number', function () {
      cy.get('[data-cy="bun-ingredients"]').contains('Добавить').click();

      cy.contains('Начинки').click();
      cy.get('[data-cy="mains-ingredients"]').contains('Добавить').click();

      cy.wait(1000);

      cy.get('[data-cy="order-button"] button')
        .should('contain', 'Оформить заказ')
        .click();

      cy.wait('@createOrder', { timeout: 10000 });

      cy.get('#modals [data-cy="modal"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain', '12345');

      cy.get('#modals [data-cy="modal-close-button"]').click();
      cy.get('#modals [data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-bun-1"]').should('not.exist');
      cy.get('[data-cy="constructor-ingredient"]').should('not.exist');
    });

    it('should NOT create order when no bun selected (click does nothing)', function () {
      cy.contains('Начинки').click();
      cy.get('[data-cy="mains-ingredients"]').contains('Добавить').click();

      cy.wait(500);

      cy.get('[data-cy="order-button"] button')
        .should('contain', 'Оформить заказ')
        .click();

      cy.get('@createOrder.all').should('have.length', 0);

      cy.get('#modals [data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-ingredient"]').should('exist');
    });

    it('should NOT create order when constructor is empty (click does nothing)', function () {
      cy.get('[data-cy="order-button"] button')
        .should('contain', 'Оформить заказ')
        .click();

      cy.get('@createOrder.all').should('have.length', 0);

      cy.get('#modals [data-cy="modal"]').should('not.exist');
    });

    it('should redirect to login when not authenticated', function () {
      cy.window().then((win) => {
        win.localStorage.removeItem('accessToken');
        win.localStorage.removeItem('refreshToken');
      });
      cy.clearCookies();

      cy.reload();

      cy.get('[data-cy="bun-ingredients"]').contains('Добавить').click();

      cy.get('[data-cy="order-button"] button')
        .should('contain', 'Оформить заказ')
        .click();

      cy.url().should('include', '/login');
    });
  });
});
