const db = require('../util/database.js');
const ref = 'users';

module.exports = {
    get(id) {
        return db.getOne(ref, {_id: id});
    },
    insert(data) {
        return db.upsert(ref, data);
    },
    update(id, data) {
        return db.upsert(ref, data, {_id: id});
    },
    delete(id) {
        return db.delete(ref, {_id: id});
    }
}
