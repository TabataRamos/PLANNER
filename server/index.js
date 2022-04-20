const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   // const sqlInsert =
//   //   "INSERT INTO categorias (nome_categoria) VALUES ('Estudos');";
//   // db.query(sqlInsert, (err, result) => {
//   //   res.send("Hello World");
//   // });
// });

app.get("/api/get", (req, res) => {
  const sqlInsert = "SELECT * FROM categorias;";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/tarefas", (req, res) => {
  const sqlInsert = "SELECT * FROM tarefas;";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const nomeCategoria = req.body.nomeCategoria;

  const sqlInsert = "INSERT INTO categorias (nome_categoria) VALUES (?);";
  db.query(sqlInsert, [nomeCategoria], (err, result) => {
    console.log(result);
  });
});

app.post("/api/insert/tarefas", (req, res) => {
  const nomeTarefa = req.body.nomeTarefa;

  const sqlInsert = "INSERT INTO tarefas (titulo_tarefa) VALUES (?);";
  db.query(sqlInsert, [nomeTarefa], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:nomeCategoria", (req, res) => {
  const nome = req.params.nomeCategoria;
  const sqlDelete = "DELETE FROM categorias WHERE nome_categoria = ?;";
  db.query(sqlDelete, nome, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/api/delete/tarefas/:titulo_tarefa", (req, res) => {
  const nome = req.params.titulo_tarefa;
  const sqlDelete = "DELETE FROM tarefas WHERE titulo_tarefa = ?;";
  db.query(sqlDelete, nome, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update", (req, res) => {
  const id = req.body.id_categoria;
  const nome = req.body.nomeCategoria;
  const sqlUpdate =
    "UPDATE categorias SET nome_categoria = ? WHERE id_categoria = ?;";
  db.query(sqlUpdate, [nome, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update/tarefas", (req, res) => {
  const id = req.body.id_tarefa;
  const nome = req.body.nomeTarefa;
  const descricao = req.body.descricao;
  const categoria = req.body.categoria;
  const sqlUpdate =
    "UPDATE tarefas SET titulo_tarefa = ?, descricao_tarefa = ?, categoria_tarefa = ? WHERE id_tarefa = ?;";
  db.query(sqlUpdate, [nome, descricao, categoria, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
