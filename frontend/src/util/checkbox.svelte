<script>
    import { createEventDispatcher } from 'svelte';

    export let value;

    const dispatch = createEventDispatcher();

    function handleChange() {
        dispatch('toggle');
    }
</script>

<style>

</style>

<input type="checkbox" bind:checked={value} on:change={handleChange} />
