import { writable } from 'svelte/store';

export function generateId() {
    const { subscribe, set, update } = writable(0);

    return {
        subscribe,
        reset: store => set(Math.max(...store.map(value => value.id), 0) + 1),
        increment: () => update(id => ++id)
    };
}
