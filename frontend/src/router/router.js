import { writable } from 'svelte/store';

export const currentRoute = writable(window.location.pathname);

export default function redirect(path, replace) {
    currentRoute.set(path);
    if (replace) {
        window.history.replaceState({path: path}, '', window.location.origin + path);    
    } else {
        window.history.pushState({path: path}, '', window.location.origin + path);
    }
};
