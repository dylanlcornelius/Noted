const Datastore = require('nedb');
const db = {
    users: new Datastore({filename: './db/users', autoload: true}),
    pages: new Datastore({filename: './db/pages', autoload: true}),
    notes: new Datastore({filename: './db/notes', autoload: true}),
}

module.exports = {
    getOne(ref, where) {
        return new Promise((resolve, reject) => {
            db[ref].findOne(where, (err, doc) => err ? reject(err) : resolve(doc));
        });
    },
    getMany(ref, where) {
        return new Promise((resolve, reject) => {
            db[ref].find(where, (err, docs) => err ? reject(err) : resolve(docs));
        });
    },
    insert(ref, data) {
        return new Promise((resolve, reject) => {
            db[ref].insert(data, (err, doc) => err ? reject(err) : resolve(doc));
        });
    },
    update(ref, filter, data) {
        return new Promise((resolve, reject) => {
            db[ref].update(filter, data, {}, (err) => err ? reject(err) : resolve());
        });
    },
    upsert(ref, data, filter) {
        return filter ? this.update(ref, filter, data) : this.insert(ref, data);
    },
    delete(ref, filter) {
        return new Promise((resolve, reject) => {
            db[ref].remove(filter, {}, (err) => err ? reject(err) : resolve());
        });
    }
};
