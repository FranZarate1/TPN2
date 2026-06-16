const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const KG_TO_LB = 2.20462;

function kgToLb(kg) {
  if (kg < 0) throw new Error('El peso no puede ser negativo');
  return parseFloat((kg * KG_TO_LB).toFixed(2));
}

function lbToKg(lb) {
  if (lb < 0) throw new Error('El peso no puede ser negativo');
  return parseFloat((lb / KG_TO_LB).toFixed(2));
}

app.get('/', (req, res) => {
  res.send('Gym Weight Converter');
});

app.get('/convert/kg/:value', (req, res) => {
  const kg = parseFloat(req.params.value);
  if (isNaN(kg)) return res.status(400).json({ error: 'Valor inválido' });
  try {
    res.json({ kg, lb: kgToLb(kg) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/convert/lb/:value', (req, res) => {
  const lb = parseFloat(req.params.value);
  if (isNaN(lb)) return res.status(400).json({ error: 'Valor inválido' });
  try {
    res.json({ lb, kg: lbToKg(lb) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = { app, kgToLb, lbToKg };

if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

