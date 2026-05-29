const request = require('supertest');
const app = require('./prueba');

describe('Servidor Express', () => {

  test('La ruta principal responde correctamente', async () => {

    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);

    expect(response.text).toBe(
      'probando mi entorno de CI Y CD'
    );

  });

});