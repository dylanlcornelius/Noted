<script>
    import Note from '../note/note.svelte';
    import Input from '../util/input.svelte';

    export let title = 'hey';
    export let notes = [];
    export let type;

    let newNote = '';
    let currentFilter = 'ALL';

    $: notesLeft = notes.filter(note => !note.completed).length;
    $: filteredNotes = currentFilter === 'ALL'
        ? notes
        : currentFilter === 'COMPLETED'
            ? notes.filter(note => note.completed)
            : notes.filter(ntoe => !notes.compeleted);

    function addNote(event) {
        notes = [...notes, {
            id: notes.length,
            content: newNote,
            completed: false,
            order: notes.length
        }];

        newNote = '';
    }

    function checkAllNotes(event) {
        notes.forEach(note => note.completed = event.target.checked);
        notes = notes;
    }

    function updateFilter(filter) {
        currentFilter = filter;
    }

    function handleDeleteNote(event) {
        notes = notes.filter(note => note.id !== event.detail.id);
    }

    function handleToggleComplete(event) {
        const noteIndex = notes.findIndex(note => note.id === event.detail.id);
        const updatedNote = {...notes[noteIndex], completed: !notes[noteIndex].completed};

        notes = [
            ...notes.slice(0, noteIndex),
            updatedNote,
            ...notes.slice(noteIndex + 1)
        ]
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
            <Note id={note.id} content={note.content} completed={note.completed} type={type} on:deleteNote={handleDeleteNote} on:toggleComplete={handleToggleComplete}/>
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
                <button on:click={() => updateFilter('ALL')} class:active="{currentFilter === 'ALL'}">All</button>
                <button on:click={() => updateFilter('ACTIVE')} class:active="{currentFilter === 'ACTIVE'}">Active</button>
                <button on:click={() => updateFilter('COMPLETED')} class:active="{currentFilter === 'COMPLETED'}">Completed</button>
            </div>
        </div>
    {/if}
</div>
