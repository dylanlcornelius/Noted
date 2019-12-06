<script>
    import { createEventDispatcher } from 'svelte';
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import MdDragHandle from 'svelte-icons/md/MdDragHandle.svelte';
    import Button from '../util/button.svelte';
    import Checkbox from '../util/checkbox.svelte';
    import TextBox from '../util/text-box.svelte';
    import { notes } from './notes.store.js';

    export let id;
    export let content;
    export let completed;
    export let type;

    const dispatch = createEventDispatcher();

    function toggleComplete() {
        notes.toggleComplete(id);
    }
    function updateContent(event) {
        notes.updateContent(id, event.detail.content);
    }
    function deleteNote() {
        notes.deleteNote(id);
    }
</script>

<style>
    .note {
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
        margin-bottom: 15px;
    }
    .content-container {
        display: flex;
        width: 100%;
    }
    .completed {
        text-decoration: line-through;
        color: grey;
    }
</style>

<div class="note">
    <div class="content-container" class:completed={completed}>
        {#if type === 'TODO'}
            <Checkbox bind:value={completed} on:toggle={toggleComplete}/>
        {/if}
        <TextBox content={content} on:update={updateContent}/>
    </div>
    {#if type === 'TODO'}
        <div style="display: flex;">
            <Button>
                <div class="icon"><MdDragHandle/></div>
            </Button>

            <Button on:click={deleteNote}>
                <div class="icon"><MdClose/></div>
            </Button>
        </div>
    {/if}
</div>
