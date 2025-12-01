describe('Burger Constructor E2E Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'https://norma.education-services.ru/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    window.localStorage.setItem('accessToken', 'test-token');
    cy.setCookie('accessToken', 'test-token');

    cy.visit('/');
  });

  afterEach(() => {
    window.localStorage.removeItem('accessToken');
    cy.clearCookie('accessToken');
  });

  it('should add ingredients to constructor', () => {
    it('should add ingredients to constructor', function () {
      // Найдите элемент по data-cy или другим атрибутам
      cy.get('[data-cy="ingredient-bun"]')
        .contains('Краторная булка N-200i')
        .trigger('dragstart');

      cy.contains('Выберите булки').trigger('drop');
      cy.contains('Краторная булка N-200i').should('exist');
    });

    cy.contains(
      'p.text_type_main-default',
      'Биокотлета из марсианской Магнолии'
    ).trigger('dragstart');
    cy.contains('Выберите начинку').trigger('drop');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('should open and close ingredient modal', () => {
    cy.contains('p.text_type_main-default', 'Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('420').should('exist');
    cy.contains('80').should('exist');

    cy.get('button.Z7mUFPBZScxutAKTLKHN').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should open and close modal by overlay click', () => {
    cy.contains('p.text_type_main-default', 'Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('div.RuQycGaRTQNbnIEC5d3Y').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should create order successfully', () => {
    cy.contains('p.text_type_main-default', 'Краторная булка N-200i').trigger(
      'dragstart'
    );
    cy.contains('Выберите булки').trigger('drop');

    cy.contains(
      'p.text_type_main-default',
      'Флюоресцентная булка R2-D3'
    ).trigger('dragstart');
    cy.contains('Выберите булки').trigger('drop');

    cy.contains(
      'p.text_type_main-default',
      'Биокотлета из марсианской Магнолии'
    ).trigger('dragstart');
    cy.contains('Выберите начинку').trigger('drop');

    cy.contains('p.text_type_main-default', 'Соус Spicy-X').trigger(
      'dragstart'
    );
    cy.contains('Выберите начинку').trigger('drop');

    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@createOrder');
    cy.contains('12345').should('exist');

    cy.get('button.Z7mUFPBZScxutAKTLKHN').click();
    cy.contains('12345').should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });

  it('should handle unauthorized order attempt', () => {
    window.localStorage.removeItem('accessToken');
    cy.clearCookie('accessToken');

    cy.reload();
    cy.wait('@getIngredients');

    cy.contains('p.text_type_main-default', 'Краторная булка N-200i').trigger(
      'dragstart'
    );
    cy.contains('Выберите булки').trigger('drop');

    cy.contains('button', 'Оформить заказ').click();
    cy.url().should('include', '/login');
  });
});
