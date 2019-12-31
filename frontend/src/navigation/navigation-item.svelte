<script>
    import { createEventDispatcher, afterUpdate } from 'svelte';
    import MdDragHandle from 'svelte-icons/md/MdDragHandle.svelte';
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import MdKeyboardArrowUp from 'svelte-icons/md/MdKeyboardArrowUp.svelte';
    import MdKeyboardArrowDown from 'svelte-icons/md/MdKeyboardArrowDown.svelte';
    import Button from '../util/button.svelte';
    import TextBox from '../util/text-box.svelte';
    import { editState } from './edit-state.store.js';
    import { selectedPage } from './selected-page.store.js';
    import { filter } from '../page/filter.store.js';
    import { pages } from '../page/pages.store.js';
    import { notes } from '../note/notes.store.js';
    
    export let page;

    const dispatch = createEventDispatcher();

    let showSubPages = false;

    $: selected = page.id === $selectedPage.id;
    $: childrenPages = $pages
        ? $pages.filter(p => {
                if (page.childPages) {
                    return page.childPages.includes(p.id);
                }
                return false;
            }).sort((a, b) => a.order - b.order)
        : [];

    function toggleSubPages() {
        showSubPages = !showSubPages;
    }
    function selectPage() {
        selectedPage.set(page);
        filter.set('ALL');
    }
    function updatePage(event) {
        pages.updateTitle(page.id, event.detail.content);
    }
    function deletePage() {
        notes.deletePageNotes(page.id, $pages);
        pages.deletePage(page.id);
    }

    afterUpdate(() => {
        dispatch('toggleShowSubPages', {
            showSubPages: showSubPages
        });
    });
</script>

<style>
    :global(.folder-icon svg) {
        vertical-align: middle;
    }
    :global(.gu-mirror) {
        color: #eee;
    }
    .page-container {
        display: flex;
        flex-direction: column;
    }
    .page {
        display: flex;
        width: 100%;
    }
    .sub-navigation {   
		display: flex;
		flex-direction: column;
        padding-left: 10px;
        min-height: 10px;
	}
    .folder-icon {
        width: 20px;
    }
    .folder-edit {
        margin-left: 12px;
    }
    .drag-icon {
        pointer-events: none;
    }
</style>

<div class="page-container" id={page.id}>
    <div class="page">
        {#if page.type === 'FOLDER'}
            {#if $editState}
                <TextBox content={page.title} type={'FOLDER'} on:update={updatePage}/>
            {/if}
                
            <Button on:click={toggleSubPages}>
                {#if !$editState}
                    {page.title}
                {/if}

                {#if showSubPages}
                    <span class="folder-icon" class:folder-edit={!$editState}><MdKeyboardArrowDown/></span>
                {:else}
                    <span class="folder-icon" class:folder-edit={!$editState}><MdKeyboardArrowUp/></span>
                {/if}
            </Button>
        {:else}
            {#if $editState}
                <TextBox content={page.title} on:update={updatePage}/>
            {:else}
                <Button selected={selected} on:click={selectPage}>
                    {page.title}
                </Button>
            {/if}
        {/if}
        {#if $editState}
            <div style="display: flex;">
                <Button handle={true}>
                    <div class="icon drag-icon"><MdDragHandle/></div>
                </Button>

                <Button on:click={deletePage}>
                    <div class="icon"><MdClose/></div>
                </Button>
            </div>
        {/if}
    </div>

    {#if showSubPages}
        <div class="sub-navigation pages" id={page.id}>
            {#each childrenPages as page (page.id)}
                <svelte:self page={page} on:updatePage on:deletePage on:toggleShowSubPages/>
            {/each}
        </div>
    {/if}
</div>
