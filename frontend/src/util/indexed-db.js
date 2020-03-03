import { openDB } from "idb";

let db;
async function connect() {
    if (!db) {
        db = await initDb();
        return db;
    } else {
        return db;
    }
}

export async function initDb() {
    if (!('indexedDB' in window)) {
        return null;
    }

    // create indexedDB database
    return openDB('noted', 1, {
        upgrade(db) {
            db.onerror = (event) => {
                console.error('Database error: ' + event.target.errorCode);
            };
    
            // create notes object store
            if (!db.objectStoreNames.contains('notes')) {
                db.createObjectStore('notes', {keyPath: 'id'});
            }
    
            // create pages object store
            if (!db.objectStoreNames.contains('pages')) {
                db.createObjectStore('pages', {keyPath: 'id'});
            }
        }
    });
}

export async function getAllData(storeName) {
    const db = await connect();
    const store = db.transaction(storeName).objectStore(storeName);
    
    return await store.getAll();
}

export async function upsertData(storeName, data) {
    const db = await connect();
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName);

    return Promise.all(data.map(d => store.put(d)))
    .catch(() => {
        transaction.abort();
        console.error('Error upsert records');
    });
}

export async function removeData(storeName, data) {
    const db = await connect();
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName);

    return Promise.all(data.map(d => store.delete(d)))
    .catch(() => {
        transaction.abort();
        console.error('Error deleting records');
    });
}
