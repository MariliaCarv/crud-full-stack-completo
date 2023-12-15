//arrquivo javascript server:


const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'brecho_brepro'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.stack);
    return;
  }

  // Se conectado com sucesso, selecione o banco de dados
  db.query('USE brecho_brepro', (err, result) => {
    if (err) {
      console.error('Erro ao selecionar o banco de dados: ' + err.stack);
      return;
    }
    console.log('Conectado ao MySQL como ID ' + db.threadId);
  });
});
app.use(cors({
  origin: 'http://localhost:3000/',  // Substitua com o seu domínio permitido
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Permite incluir cookies na solicitação (se aplicável)
  optionsSuccessStatus: 204,  // Responde com 204 - No Content para solicitações OPTIONS
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para o ponto de extremidade raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../crud2/crud.html'));
});

// Rota para obter todos os produtos
app.get('/api/produtos', (req, res) => {
  const query = 'SELECT * FROM produtos';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).send('Erro ao buscar produtos');
      return;
    }
    res.send(result);
  });
});

// Rota para adicionar um novo produto
app.post('/api/produtos', (req, res) => {
  const { productCode, product, qty, perPrice } = req.body;
  const query = `INSERT INTO produtos (productCode, product, qty, perPrice) VALUES (?, ?, ?, ?)`;
  db.query(query, [productCode, product, qty, perPrice], (err, result) => {
    if (err) throw err;
    res.send('Produto adicionado com sucesso!');
  });
});


// Rota para atualizar um produto
app.put('/api/produtos/:id', (req, res) => {
  const id = req.params.id;
  const { productCode, product, qty, perPrice } = req.body;
  const query = `UPDATE produtos SET productCode=?, product=?, qty=?, perPrice=? WHERE id=?`;
  db.query(query, [productCode, product, qty, perPrice, id], (err, result) => {
    if (err) throw err;
    res.send('Produto atualizado com sucesso!');
  });
});
// Rota para deletar um produto
app.delete('/api/produtos/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM produtos WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send('Produto deletado com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
