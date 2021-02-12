import { writable } from 'svelte/store';

function createOnline() {
    const { subscribe, set } = writable(navigator.onLine);

    return {
        subscribe,
        set: (online) => set(online)
    }
}

export const online = createOnline();

window.addEventListener('online', () => online.set(true));
window.addEventListener('offline', () => online.set(false));
