<script>
    import { createEventDispatcher } from 'svelte';
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import MdDragHandle from 'svelte-icons/md/MdDragHandle.svelte';
    import PageTypes from '../navigation/page-types.js';
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
    .drag-icon {
        pointer-events: none;
    }
</style>

<div class="note" id={id}>
    <div class="content-container" class:completed={completed}>
        {#if type === PageTypes.TODO}
            <Checkbox bind:value={completed} on:toggle={toggleComplete}/>
            <TextBox content={content} on:update={updateContent}/>
        {/if}
    </div>
    {#if type === PageTypes.TODO}
        <div style="display: flex;">
            <Button handle={true}>
                <div class="icon drag-icon"><MdDragHandle/></div>
            </Button>

            <Button on:click={deleteNote}>
                <div class="icon"><MdClose/></div>
            </Button>
        </div>
    {/if}
</div>
