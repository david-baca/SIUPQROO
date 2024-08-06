// main.js
const {estadisticasCarreras} = require('./model/CarrerasProcess');

(async () => {
  const x = await estadisticasCarreras();
  console.log(x)
})();
