const request = require('supertest');

const {

app,

kgToLb,

lbToKg

} = require('./ejemplo');

describe('Gym Weight Converter',()=>{


describe('kgToLb()',()=>{


test('100 kg = 220.46 lb',()=>{

expect(

kgToLb(100)

).toBe(220.46);

});


test('0 kg = 0 lb',()=>{

expect(

kgToLb(0)

).toBe(0);

});


test('valor negativo lanza error',()=>{

expect(

()=>kgToLb(-1)

).toThrow('negativo');

});

});


describe('lbToKg()',()=>{


test('220.46 lb = 100 kg',()=>{

expect(

lbToKg(220.46)

).toBe(100);

});


test('0 lb = 0 kg',()=>{

expect(

lbToKg(0)

).toBe(0);

});


test('valor negativo lanza error',()=>{

expect(

()=>lbToKg(-5)

).toThrow('negativo');

});

});


describe('GET /convert/kg/:value',()=>{


test('convierte 100 kg',async()=>{


const res=

await request(app)

.get('/convert/kg/100');


expect(

res.statusCode

).toBe(200);


expect(

res.body

).toEqual({

kg:100,

lb:220.46

});

});

});


describe('GET /convert/lb/:value',()=>{


test('convierte 220.46 lb',async()=>{


const res=

await request(app)

.get('/convert/lb/220.46');


expect(

res.statusCode

).toBe(200);


expect(

res.body

).toEqual({

lb:220.46,

kg:100

});

});

});

});