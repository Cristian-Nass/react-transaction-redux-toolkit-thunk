// DO NOT CHANGE THIS FILE!

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

describe("Transaction Management Frontend - Level 1", () => {
  it("The app can submit new transactions and show the historical ones", () => {
    cy.visit("http://localhost:3000/");

    // submit a transaction & verify the position on the list
    const accountId = uuid();
    const amount = 30;
    const balance = 30;
    cy.get("[data-type=account-id]").type(accountId);
    cy.get("[data-type=amount]").type(amount);
    cy.get("[data-type=transaction-submit]").click();
    cy.get(`[data-type=transaction]`).should("exist");
    cy.get(`[data-account-id=${accountId}]`).should("exist");
    cy.get(`[data-amount=${amount}]`).should("exist");
    cy.get(`[data-balance=${balance}]`).should("exist");

    // submit a new transaction to the same account and verify the balance
    const newAmount = 7;
    const newBalance = 37;
    cy.get("[data-type=account-id]").type(accountId);
    cy.get("[data-type=amount]").type(newAmount);
    cy.get("[data-type=transaction-submit]").click();
    cy.get(`[data-type=transaction]`).should("exist");
    cy.get(`[data-account-id=${accountId}]`).should("exist");
    cy.get(`[data-amount=${newAmount}]`).should("exist");
    cy.get(`[data-balance=${newBalance}]`).should("exist");

    // submit another transaction & verify the position on the list
    const anotherAccountId = uuid();
    const anotherAmount = 7;
    const anotherBalance = 7;
    cy.get("[data-type=account-id]").type(anotherAccountId);
    cy.get("[data-type=amount]").type(anotherAmount);
    cy.get("[data-type=transaction-submit]").click();
    cy.get(`[data-type=transaction]`).should("exist");
    cy.get(`[data-account-id=${anotherAccountId}]`).should("exist");
    cy.get(`[data-amount=${anotherAmount}]`).should("exist");
    cy.get(`[data-balance=${anotherBalance}]`).should("exist");

    // submit a transaction with a negative amount & verify the position on the list
    const negativeAmount = -5;
    const negativeBalance = 2;
    cy.get("[data-type=account-id]").type(anotherAccountId);
    cy.get("[data-type=amount]").type(negativeAmount);
    cy.get("[data-type=transaction-submit]").click();
    cy.get(`[data-type=transaction]`).should("exist");
    cy.get(`[data-account-id=${anotherAccountId}]`).should("exist");
    cy.get(`[data-amount=${negativeAmount}]`).should("exist");
    cy.get(`[data-balance=${negativeBalance}]`).should("exist");
  });
});
