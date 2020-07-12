const knex = require('knex');
const { database } = require('../config');

const db = knex({
  client: 'mysql',
  connection: database,
  pool: { min: 0, max: 100 },
});

module.exports = db;

module.exports.page = function (table, page, pageSize, whereArgs, orderByArgs, otherArgs = {}) {
  const offset = (page - 1) * pageSize;
  let query = db.select().table(table);
  if (whereArgs) {
    query = query.where(...whereArgs);
  }
  if (orderByArgs) {
    query = query.orderBy(...orderByArgs);
  }
  for (let key in otherArgs) {
    query = query[key](...otherArgs[key]);
  }
  return query.offset(offset).limit(pageSize);
};

module.exports.view = async function (table, id) {
  const results = await db.from(table).where('id', id);
  if (results.length === 0) return Promise.resolve(null);
  return Promise.resolve(results[0]);
};

module.exports.delete = async function (table, id) {
  const results = await db.from(table).where('id', id).delete();
  return Promise.resolve(results.affectedRows > 0);
};

module.exports.total = async function (table, whereArgs) {
  let query = db.from(table);
  if (whereArgs) {
    query = query.where(...whereArgs);
  }
  const ret = await query.count('id as total').first();
  return ret.total;
};
