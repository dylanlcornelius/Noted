<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import Checkbox from '../util/checkbox.svelte';

    export let id;
    export let content;
    export let completed;
    export let type;

    const dispatch = createEventDispatcher();

    function deleteNote() {
        dispatch('deleteNote', {
            id: id
        });
    }

    function toggleComplete() {
        dispatch('toggleComplete', {
            id: id
        });
    }
</script>

<style>
    .note {
        display: flex;
        align-items: cetner;
        justify-content: space-between;
        animation-duration: 0.3s;
        margin-bottom: 15px;
    }

    .completed {
        text-decoration: line-through;
        color: grey;
    }
</style>

<div class="note" transition:fly="{{ x: -20, duration: 300 }}">
    <div class:completed={completed}>
        {#if type === 'TODO'}
            <!-- <input type="checkbox" class="checkbox" bind:checked={completed} on:change={toggleComplete}/> -->
            <Checkbox bind:value={completed} on:toggle={toggleComplete}/>
        {/if}
        {id} {content}
    </div>
    {#if type === 'TODO'}
    <div on:click={deleteNote}>
        x
    </div>
    {/if}
</div>
