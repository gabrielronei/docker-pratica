const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'nodezinho'
});

connection.connect(function (err) {
    if (err) throw err;

    const sql = "CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name VARCHAR(255), PRIMARY KEY(id))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Tabela criada com sucesso!");
    });
});

app.get('/', (req, res) => {
  connection.query(`INSERT INTO people (name) VALUES ('Gabriel${new Date().getTime()}')`);
  res.writeHead(200, {'Content-Type': 'text/html'});
  

  res.write('<h1>Gabriel Ronei Rocks!!!</h1>');
  res.write('<hr/>');
  
  connection.query(`SELECT id, name FROM people`, (error, results, fields) => {
    res.write('<table>');
    res.write('<tr>');
    res.write('<th>Id</th>');
    res.write('<th>Nome</th>');
    res.write('</tr>');

    res.write(`
        ${!!results.length ? results.map(result => `<tr><td>${result.id}</td><td>${result.name}</td></tr>`).join('') : ''}
    `)
    res.write('</table>');
    res.end();
  });
});

app.get('/teste', (req, res) => {
    console.log('teste');
});

app.listen(port, () => {
  console.log(`Rodando ${port}`);
});