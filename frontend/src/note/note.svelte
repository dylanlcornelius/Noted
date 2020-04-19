<script>
    import { createEventDispatcher } from 'svelte';
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import MdDragHandle from 'svelte-icons/md/MdDragHandle.svelte';
    import PageTypes from '../navigation/page-types.js';
    import Button from '../util/button.svelte';
    import Checkbox from '../util/checkbox.svelte';
    import TextBox from '../util/text-box.svelte';
    import { notes } from './notes.store.js';
    import NoteService from './note.service.js';

    export let note;
    export let type;

    const dispatch = createEventDispatcher();

    function toggleComplete() {
        notes.toggleComplete(note.id);
        NoteService.put([{...note, completed: !note.completed}]);
    }
    function updateContent(event) {
        notes.updateContent(note.id, event.detail.content);
        NoteService.put([{...note, content: event.detail.content}]);
    }
    function deleteNote() {
        notes.deleteNote(note.id);
        NoteService.delete(note.id);
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
    .todo-container {
        display: flex;
    }
    .completed {
        text-decoration: line-through;
        color: grey;
    }
    .drag-icon {
        pointer-events: none;
    }
</style>

<div class="note" id={note.id}>
    <div class="content-container" class:completed={note.completed}>
        {#if type === PageTypes.TODO}
            <Checkbox value={note.completed} on:toggle={toggleComplete}/>
            <TextBox content={note.content} editor={true} on:update={updateContent}/>
        {/if}
    </div>
    {#if type === PageTypes.TODO}
        <div class="todo-container">
            <Button handle={true}>
                <div class="icon drag-icon"><MdDragHandle/></div>
            </Button>

            <Button on:click={deleteNote}>
                <div class="icon"><MdClose/></div>
            </Button>
        </div>
    {/if}
</div>
