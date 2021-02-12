import { get } from 'svelte/store';
// import { get, upsert, remove } from '../util/indexed-db.js';
import { online } from '../util/online.store.js';

// TODO: sync with backend
export default {
    sync(ref) {
        // get all indexeddb refs
        // upsert all new/changed refs
    },
    async get(ref, id) {
        if (get(online)) {
            const response = await fetch(`http://localhost:3002/${ref}/${id}`);
            const data = await response.json();
            console.log(data);
            return data;
        }
    },
    update(ref, data, id) {
        if (get(online)) {
            console.log(id, data);
            fetch(`http://localhost:3002/${ref}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
        }
    },
    remove(ref, data) {
        if (get(online)) {
    
        }
    }
};
