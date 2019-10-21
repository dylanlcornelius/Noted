<script>
    import { createEventDispatcher } from 'svelte';
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

<div class="note">
    <div class:completed={completed}>
        {#if type === 'TODO'}
            <Checkbox bind:value={completed} on:toggle={toggleComplete}/>
        {/if}
        {content}
    </div>
    {#if type === 'TODO'}
        <div on:click={deleteNote}>
            x
        </div>
    {/if}
</div>
