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
        updateDefault: (id) => update(store => {
            return store.map(page => {
                if (page.id === id) {
                    page.default = true
                } else {
                    page.default = false
                }

                return page;
            });
        }),
        updateOrder: (id, index, parentPageId, oldParentPageId) => update(store => {
            id = parseInt(id);
            parentPageId = parentPageId ? parseInt(parentPageId) : undefined;
            oldParentPageId = oldParentPageId ? parseInt(oldParentPageId) : undefined;

            const oldOrder = store.find(page => page.id === id).order;
            const isReorder = parentPageId === oldParentPageId;
            const isGreater = index > oldOrder;

            return store.map(page => {
                if (page.id === id) {
                    page.order = index;
                    page.parentPage = parentPageId;
                } else if (isReorder) {
                    // reorder inside same folder
                    if (page.parentPage === parentPageId) {
                        if (isGreater && page.order <= index && page.order > oldOrder) {
                            page.order--;
                        } else if (page.order >= index && page.order < oldOrder) {
                            page.order++;
                        }
                    }
                } else {
                    // move folders - adjust parent/child references
                    if (page.id === oldParentPageId) {
                        page.childPages = page.childPages.filter(childId => childId !== id);
                    } else if (page.id === parentPageId) {
                        if (!page.childPages) {
                            page.childPages = [];
                        }
                        page.childPages.push(id);
                    }
                    
                    if (page.parentPage === oldParentPageId && page.order >= oldOrder) {
                        page.order--;
                    } else if (page.parentPage === parentPageId && page.order >= index) {
                        page.order++;
                    }
                }

                return page;
            });
        }),
        deletePage: (id) => update(store => {
            let updatedPages = store;
            let pagesToDelete = [id];

            const page = store.find(page => page.id === id);
            const oldParentPageId = page.parentPage;
            const oldOrder = page.order;

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

            // update order
            return updatedPages.map(page => {
                if (page.id === oldParentPageId) {
                    page.childPages = page.childPages.filter(childId => childId !== id);
                }
                
                if (page.parentPage === oldParentPageId && page.order > oldOrder) {
                    page.order--;
                }

                return page;
            });
        })
    };
}

export const pages = createPageStore();
