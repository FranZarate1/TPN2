const request = require('supertest');
const { app, kgToLb, lbToKg } = require('./app');

describe('Gym Weight Converter', () => {

  // --- lógica pura ---
  describe('kgToLb()', () => {
    test('100 kg = 220.46 lb', () => {
      expect(kgToLb(100)).toBe(220.46);
    });
    test('0 kg = 0 lb', () => {
      expect(kgToLb(0)).toBe(0);
    });
    test('2.5 kg = 5.51 lb', () => {
      expect(kgToLb(2.5)).toBe(5.51);
    });
    test('valor negativo lanza error', () => {
      expect(() => kgToLb(-1)).toThrow('negativo');
    });
  });

  describe('lbToKg()', () => {
    test('220.46 lb = 100 kg', () => {
      expect(lbToKg(220.46)).toBe(100);
    });
    test('0 lb = 0 kg', () => {
      expect(lbToKg(0)).toBe(0);
    });
    test('valor negativo lanza error', () => {
      expect(() => lbToKg(-5)).toThrow('negativo');
    });
  });

  // --- rutas HTTP ---
  describe('GET /', () => {
    test('responde 200 con el nombre de la app', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('Gym Weight Converter');
    });
  });

  describe('GET /convert/kg/:value', () => {
    test('convierte 100 kg correctamente', async () => {
      const res = await request(app).get('/convert/kg/100');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ kg: 100, lb: 220.46 });
    });
    test('valor negativo devuelve 400', async () => {
      const res = await request(app).get('/convert/kg/-10');
      expect(res.statusCode).toBe(400);
    });
    test('valor no numérico devuelve 400', async () => {
      const res = await request(app).get('/convert/kg/abc');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /convert/lb/:value', () => {
    test('convierte 220.46 lb correctamente', async () => {
      const res = await request(app).get('/convert/lb/220.46');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ lb: 220.46, kg: 100 });
    });
    test('valor negativo devuelve 400', async () => {
      const res = await request(app).get('/convert/lb/-5');
      expect(res.statusCode).toBe(400);
    });
  });

});