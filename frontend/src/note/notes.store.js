import { writable, get } from 'svelte/store';
import { generateId } from '../util/id-generator.js/';

const id = generateId();

function createNoteStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set: store => {
            set(store);
            id.reset(store);
        },
        addNote: (pageId, order, content) => update(store => {
            const newId = get(id);
            id.increment();

            return [
                ...store,
                {
                    id: newId,
                    content: content,
                    completed: false,
                    order: order,
                    page: pageId,
                }
            ];
        }),
        updateContent: (id, content) => update(store => {
            const noteIndex = store.findIndex(note => note.id === id);

            return [
                ...store.slice(0, noteIndex),
                {...store[noteIndex], content: content},
                ...store.slice(noteIndex + 1)
            ];
        }),
        updateOrder: (id, index, page) => update(store => {
            id = parseInt(id);

            const oldOrder = store.find(note => note.id === id).order;
            const isGreater = index > oldOrder;

            return store.map(note => {
                if (note.id === id) {
                    note.order = index;
                } else if (note.page === page) {
                    if (isGreater && note.order <= index && note.order > oldOrder) {
                        note.order--;
                    } else if (note.order >= index && note.order < oldOrder) {
                        note.order++;
                    }
                }

                return note;
            });
        }),
        toggleComplete: (id) => update(store => {
            const noteIndex = store.findIndex(note => note.id === id);

            return [
                ...store.slice(0, noteIndex),
                {...store[noteIndex], completed: !store[noteIndex].completed},
                ...store.slice(noteIndex + 1)
            ];
        }),
        toggleAll: (id, checked) => update(store => {
            return store.map(note => {
                if (note.page === id) {
                    note.completed = checked;
                }

                return note;
            });
        }),
        deleteNote: (id) => update(store => {
            const oldOrder = store.find(note => note.id === id).order;
            
            return store.filter(note => note.id !== id)
            .map(note => {
                if (note.order > oldOrder) {
                    note.order--;
                }
                return note;
            });
        }),
        deletePageNotes: (id, pages) => update(store => {
            let pageNotesToDelete = [id];
            let pagesToDelete = [id];

            while (pagesToDelete.length > 0) {
                pages.forEach(page => {
                    if (page.id === pagesToDelete[0]) {
                        // mark children for deletion
                        if (page.childPages) {
                            pageNotesToDelete = pageNotesToDelete.concat(page.childPages);
                            pagesToDelete = pagesToDelete.concat(page.childPages);

                        }
                    }
                });

                pagesToDelete.shift();
            }

            return store.filter(note => !pageNotesToDelete.includes(note.page));
        })
    };
}

export const notes = createNoteStore();
