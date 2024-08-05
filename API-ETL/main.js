// main.js
const {estadisticasGrupos} = require('./model/GruposProcess');

(async () => {
  const x = await estadisticasGrupos();
  console.log(x)
})();
