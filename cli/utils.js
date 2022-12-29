const db = require("./db");

function printHelp() {
  console.log(`
    usage: 
    node cli fetch-all
    node cli fetch 
    node cli insert "book name"
    node cli update id "book name"
    node cli delete id
    `);
}

function insertNovel(title) {
  const now = `${new Date().toISOString()}`;
  const insertText =
    "INSERT INTO novels (title, createdat, updatedat) VALUES ($1, $2, $3) RETURNING *";
  return db.query(insertText, [title, now, now]);
}

function fetchAllNovels() {
  return db.query(`SELECT id, title FROM novels ORDER BY id DESC`);
}

function getNovel(id) {
  const query = `SELECT id, title, createdat, updatedat FROM novels WHERE id=$1`;
  return db.query(query, [id]);
}

function updateNovel(id, title) {
  const now = `${new Date().toISOString()}`;
  const updateText =
    "UPDATE novels SET title=$2, updatedat=$3 WHERE id=$1 RETURNING *";
  return db.query(updateText, [id, title, now]);
}

function deleteNovel(id) {
  const query = `DELETE FROM novels WHERE id=$1 RETURNING *`;
  return db.query(query, [id]);
}

module.exports = {
  printHelp,
  insertNovel,
  fetchAllNovels,
  getNovel,
  updateNovel,
  deleteNovel,
};
