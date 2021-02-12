<script>
    import { createEventDispatcher } from 'svelte';

    export let value;

    const dispatch = createEventDispatcher();

    function handleChange() {
        dispatch('toggle');
    }
</script>

<input class="checkbox" type="checkbox" bind:checked={value} on:change={handleChange} />

<style type="text/scss">
    .checkbox {
        margin: auto 5px;
    }
</style>
