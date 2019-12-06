import { writable } from 'svelte/store';

function createNoteStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set: store => set(store),
        addNote: (id, content) => update(store => {
            return [
                ...store,
                {
                    id: store.length,
                    content: content,
                    completed: false,
                    order: store.length,
                    page: id,
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
            return store.filter(note => note.id !== id);
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
