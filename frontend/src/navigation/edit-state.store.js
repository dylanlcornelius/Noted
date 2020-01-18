import { writable } from 'svelte/store';

function createEditState() {
    const { subscribe, update } = writable(false);

    return {
        subscribe,
        toggle: () => update(editState => !editState)
    };
}

export const editState = createEditState();
