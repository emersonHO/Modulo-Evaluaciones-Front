/* global describe, it, cy */
describe("Ejemplo de prueba", () => {
  it("debería cargar la página principal", () => {
    // Visitar la página principal (ajusta la URL según tu configuración)
    cy.visit("http://localhost:5173");

    // Verificar que la página se carga correctamente
    cy.get("body").should("be.visible");
  });

  it("debería tener el título correcto", () => {
    cy.visit("http://localhost:5173");

    // Verificar el título de la página
    cy.title().should("not.be.empty");
  });
});
