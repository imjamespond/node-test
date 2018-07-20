const Promise = require('bluebird');
const sqlite = require('sqlite');


// let p = sqlite.open(':memory:', { cached: true });
let p = sqlite.open('./database.sqlite', { cached: true });
p = p.then(() => sqlite.exec('CREATE TABLE IF NOT EXISTS tbl (col TEXT)'));
p = p.then(() => sqlite.exec('INSERT INTO tbl VALUES ("test")'));
p = p.then(() => sqlite.get('SELECT col FROM tbl').then((result) => {
  console.log(result)
}));
p = p.then(() => sqlite.all('SELECT col FROM tbl').then((result) => {
  console.log(result)
}));
p = p.then(() => sqlite.all('SELECT * FROM tbl WHERE col = ?', 'test').then((result) => {
  console.log(result)
}));