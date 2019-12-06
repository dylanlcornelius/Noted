import { writable } from 'svelte/store';

function createPageStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set: store => set(store),
        addPage: (title, type) => update(store => {
            return [...store, {
                id: store.length,
                title: title,
                type: type,
                default: false,
                order: store.length,
            }];
        }),
        updateTitle: (id, title) => update(store => {
            const pageIndex = store.findIndex(page => page.id === id);
            
            return [
                ...store.slice(0, pageIndex),
                {...store[pageIndex], title: title},
                ...store.slice(pageIndex + 1)
            ];
        }),
        deletePage: (id) => update(store => {
            let updatedPages = store;
            let pagesToDelete = [id];

            while (pagesToDelete.length > 0) {
                updatedPages.forEach(page => {
                    if (page.id === pagesToDelete[0]) {
                        // mark children for deletion
                        if (page.childPages) {
                            pagesToDelete = pagesToDelete.concat(page.childPages);
                        }
                        // remove parent page
                        updatedPages = updatedPages.filter(updatedPage => updatedPage.id !== pagesToDelete[0]);
                    }
                });

                pagesToDelete.shift();
            }

            return updatedPages;
        })
    };
}

export const pages = createPageStore();
