<script>
    import Note from '../note/note.svelte';
    import Input from '../util/input.svelte';
    import { notes } from '../note/notes.store.js';
    import { filter } from './filter.store.js';

    export let id;
    export let title = 'hey';
    export let type;

    let newNote = '';

    $: pageNotes = $notes.filter(note => note.page === id);
    $: notesLeft = pageNotes.filter(note => !note.completed).length;
    $: filteredNotes = $filter === 'ALL'
        ? pageNotes
        : $filter === 'COMPLETED'
            ? pageNotes.filter(note => note.completed)
            : pageNotes.filter(note => !note.completed);

    function addNote(event) {
        notes.addNote(id, newNote);
        newNote = '';
    }
    function checkAllNotes(event) {
        notes.toggleAll(id, event.target.checked);
    }
    function updateFilter(newFilter) {
        filter.set(newFilter);
    }
</script>

<style>
    .page {
        padding: 10px;
        margin: 10px;
        display: grid;
    }
    .title {
        font-size: 18px;
        display: flex;
        justify-content: center;
        margin-bottom: 15px;
    }
    .row-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 15px;
        margin-bottom: 15px;
        border-top: 1px solid #505b66;
    }
    button {
        min-width: 60px;
        border: none;
        border-radius: 1px;
        background: none;
        white-space: nowrap;
        color: #eee;
    }
    button:hover {
        color: #aaa;
    }
    .active {
        background: #12a0f2;
    }
    .active:hover {
        color: #444;
    }
</style>

<div class="page">
    <div class="title">{title}</div>
    {#if type === 'TODO'}
        <Input placeholder="Add new item..." bind:value={newNote} on:add={addNote}/>
    {/if}

    <div>
        {#each filteredNotes as note (note.id)}
            <Note id={note.id} content={note.content} completed={note.completed} type={type}/>
        {/each}
    </div>

    {#if type === 'TODO'}
        <div class="row-container">
            <div>
                <input type="checkbox" on:change={checkAllNotes}/>
                Check All
            </div>
            <div>
                {notesLeft} items left
            </div>
        </div>
            
        <div class="row-container">
            <div>
                <button on:click={() => updateFilter('ALL')} class:active="{$filter === 'ALL'}">All</button>
                <button on:click={() => updateFilter('ACTIVE')} class:active="{$filter === 'ACTIVE'}">Active</button>
                <button on:click={() => updateFilter('COMPLETED')} class:active="{$filter === 'COMPLETED'}">Completed</button>
            </div>
        </div>
    {/if}
</div>
