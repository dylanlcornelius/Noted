<script>
    import { onMount, getContext } from 'svelte';
    import dragula from 'dragula';
    import MdMoreVert from 'svelte-icons/md/MdMoreVert.svelte'
    import PageTypes from '../navigation/page-types.js';
    import Note from '../note/note.svelte';
    import TextBox from '../util/text-box.svelte';
    import Input from '../util/input.svelte';
    import Button from '../util/button.svelte';
    import Dropdown from '../util/dropdown.svelte';
    import { selectedPage } from '../navigation/selected-page.store.js';
    import { pages } from './pages.store.js';
    import { notes } from '../note/notes.store.js';
    import { filter } from './filter.store.js';

    const { open } = getContext('modal');

    export let id;
    export let title = 'hey';
    export let type;

    const options = [
        {
            name: 'Set as default',
            action: () => {
                pages.updateDefault(id);
            }
        },
        {
            name: 'Delete page',
            action: () => {
                open('Are you sure?', () => {
                    if ($selectedPage.id === id) {
                        selectedPage.set(null);
                    }
                    
                    notes.deletePageNotes(id, $pages);
                    pages.deletePage(id);
                });
            }
        }
    ];

    let newNote = '';
    let drake;

    $: pageNotes = $notes.filter(note => note.page === id);
    $: notesLeft = pageNotes.filter(note => !note.completed).length;
    $: filteredNotes = ($filter === 'ALL'
        ? pageNotes
        : $filter === 'COMPLETED'
            ? pageNotes.filter(note => note.completed)
            : pageNotes.filter(note => !note.completed)
    ).sort((a, b) => a.order - b.order);
    $: {
        if (type === PageTypes.TODO) {
            initDND();
        } else if (drake) {
            drake.destroy();
        }
    };

    function updatePage(event) {
        pages.updateTitle(id, event.detail.content);
        if ($selectedPage && id === $selectedPage.id) {
            const newPage = $pages.find(p => p.id === id);
            selectedPage.set(newPage);
        }
    }
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
    function initDND() {
        // fix for initDND getting called twice onMount - onMount is necessary to wait for element id to be initialized
        if (drake) {
            drake.destroy();
        }
        if (document.getElementById('notes')) {
            drake = dragula([document.getElementById('notes')], {
                copySortSource: true,
                revertOnSpill: true,
                moves: (el, container, handle) => {
                    return typeof handle.className === "string" ? handle.className.includes('handle') : false;
                }
            });

            drake.on('drop', (el, target, source, sibling) => {
                notes.updateOrder(el.id, [].slice.call(el.parentNode.children).findIndex((item) => el === item), id);
            });
        }
    }

    onMount(() => {
        initDND();
    });
</script>

<style>
    .page {
        padding: 10px;
        margin: 10px 10px 50px;
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
    .filters-container {
        display: flex;
    }
</style>

<div class="page">
    <div class="title">
        <TextBox content={title} on:update={updatePage}/>
    </div>
    {#if type === PageTypes.TODO}
        <Input placeholder="Add new item..." bind:value={newNote} on:add={addNote}/>
    {/if}

    <div id="notes">
        {#each filteredNotes as note (note.id)}
            <Note id={note.id} content={note.content} completed={note.completed} type={type}/>
        {/each}
    </div>

    {#if type === PageTypes.TODO}
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
            <div class="filters-container">
                <Button on:click={() => updateFilter('ALL')} selected="{$filter === 'ALL'}">All</Button>
                <Button on:click={() => updateFilter('ACTIVE')} selected="{$filter === 'ACTIVE'}">Active</Button>
                <Button on:click={() => updateFilter('COMPLETED')} selected="{$filter === 'COMPLETED'}">Completed</Button>
            </div>
            <div>
                <Dropdown options={options} right={true}>
                    <Button>
                        <span class="icon"><MdMoreVert/></span>
                    </Button>
                </Dropdown>
            </div>
        </div>
    {/if}
</div>
