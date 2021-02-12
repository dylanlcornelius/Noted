const db = require('../util/database.js');
const ref = 'pages';

module.exports = {
    get(id) {
        return db.getMany(ref, {users: id});
    },
    insert(data) {
        data.users = JSON.parse(data.users);
        return db.upsert(ref, data);
    },
    update(id, data) {
        data.users = JSON.parse(data.users);
        return db.upsert(ref, data, {_id: id});
    },
    delete(id) {
        return db.delete(ref, {_id: id});
    }
}
