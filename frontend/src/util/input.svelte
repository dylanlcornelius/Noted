<script>
    import { createEventDispatcher } from 'svelte';

    export let type = "text";
    export let placeholder;
    export let value;

    const dispatch = createEventDispatcher();

    function add() {
        if (event.key === 'Enter') {
            dispatch('add');
        }
    }
</script>

{#if type === "password"}
    <input type="password" placeholder={placeholder} bind:value on:keydown={add}/>
{:else}
    <input type="text" placeholder={placeholder} bind:value on:keydown={add}/>
{/if}

<style type="text/scss">
    @import "../theme";

    input {
        background: none;
        border: none;
        color: $theme-text-color;
        margin: 0;
        width: 100%;
    }
    input:focus {
        outline: none;
    }
    input::placeholder {
        color: $theme-text-color;
        opacity: 0.6;
    }
</style>
