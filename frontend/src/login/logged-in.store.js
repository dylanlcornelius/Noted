import { writable } from 'svelte/store';

function createLoggedIn() {
    const { subscribe, update } = writable(true);

    return {
        subscribe,
        toggle: () => update(loggedIn => !loggedIn)
    };
}

export const loggedIn = createLoggedIn();
