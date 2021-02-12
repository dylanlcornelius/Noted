const db = require('../util/database.js');
const ref = 'notes';

module.exports = {
    get(ids) {
        return db.getMany(ref, {page: {$in: ids}});
    },
    insert(data) {
        return db.upsert(ref, data);
    },
    update(id, data) {
        return db.upsert(ref, data, {_id: id});
    },
    delete(id) {
        return db.delete(ref, {_id: id});
    },
    deletePage(id) {
        return db.delete(ref, {page: id});
    }
}
