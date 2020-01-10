<script>
    import { createEventDispatcher } from 'svelte';

    export let placeholder;
    export let value;

    const dispatch = createEventDispatcher();

    function add() {
        if (event.key === 'Enter') {
            dispatch('add');
        }
    }
</script>

<style>
    input {
        background: none;
        border: none;
        color: white;
    }
    input:focus {
        outline: none;
    }
    input::placeholder {
        color: white;
        opacity: 0.6;
    }
</style>

<input type="text" placeholder={placeholder} bind:value on:keydown={add}/>
