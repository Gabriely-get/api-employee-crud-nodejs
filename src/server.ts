// importa o express
import express from 'express';
// importar rotas
import Routes from './routes';
// instancia o express
const app = express();
// Instancia CORS
const cors = require('cors');
// Configura CORS
app.use(cors())
// Configurar uso de json
app.use(express.json());
// Configuração de uso das rotas
app.use(Routes);
//configura porta e funçao executada na ativação
app.listen(4000, ()=>{console.log("Servidor Iniciado")} );