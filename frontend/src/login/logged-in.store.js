import { writable } from 'svelte/store';

function createLoggedIn() {
    const { subscribe, update } = writable(false);

    return {
        subscribe,
        toggle: () => update(loggedIn => !loggedIn)
    };
}

export const loggedIn = createLoggedIn();
