<script>
    import { createEventDispatcher, afterUpdate } from 'svelte';
    import MdDragHandle from 'svelte-icons/md/MdDragHandle.svelte';
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import MdKeyboardArrowUp from 'svelte-icons/md/MdKeyboardArrowUp.svelte';
    import MdKeyboardArrowDown from 'svelte-icons/md/MdKeyboardArrowDown.svelte';
    import PageTypes from './page-types.js';
    import Button from '../util/button.svelte';
    import TextBox from '../util/text-box.svelte';
    import { editState } from './edit-state.store.js';
    import { selectedPage } from './selected-page.store.js';
    import { filter } from '../page/filter.store.js';
    import { pages } from '../page/pages.store.js';
    import { notes } from '../note/notes.store.js';
    
    export let page;

    const dispatch = createEventDispatcher();

    let showSubPages = hasDefault() || page.open;

    $: selected = $selectedPage && page._id === $selectedPage._id;
    $: childrenPages = $pages
        ? $pages.filter(p => {
                if (page.childPages) {
                    return page.childPages.includes(p._id);
                }
                return false;
            }).sort((a, b) => a.order - b.order)
        : [];

    function hasDefault() {
        let allPages = $pages;
        let pagesToDelete = [page._id];

        let hasDefault = false;

        while (pagesToDelete.length > 0) {
            allPages.forEach(page => {
                if (page._id === pagesToDelete[0]) {
                    if (page.childPages) {
                        pagesToDelete = pagesToDelete.concat(page.childPages);
                    }

                    hasDefault |= page.default;
                }
            });

            pagesToDelete.shift();
        }

        return hasDefault;
    }
    function toggleSubPages() {
        showSubPages = !showSubPages;
        pages.updateOpen(page._id, showSubPages);
    }
    function selectPage() {
        selectedPage.set(page);
        filter.set('ALL');
    }
    function updatePage(event) {
        pages.updateTitle(page._id, event.detail.content);
        if (selected) {
            const newPage = $pages.find(p => p._id === page._id);
            selectedPage.set(newPage);
        }
    }
    function deletePage() {
        if ($selectedPage && $selectedPage._id === page._id) {
            selectedPage.set(null);
        }

        notes.deletePageNotes(page._id, $pages);
        pages.deletePage(page._id);
    }

    afterUpdate(() => {
        dispatch('toggleShowSubPages', {
            showSubPages: showSubPages
        });
    });
</script>

<div class="page-container" id={page._id}>
    <div class="page">
        {#if page.type === PageTypes.FOLDER}
            {#if $editState}
                <TextBox content={page.title} on:update={updatePage}/>
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
                <TextBox content={page.title} editor={true} on:update={updatePage}/>
            {:else}
                <Button selected={selected} on:click={selectPage}>
                    {page.title}
                    {#if page.default}
                        *
                    {/if}
                </Button>
            {/if}
        {/if}
        {#if $editState}
            <div class="edit-container">
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
        <div class="sub-navigation pages" id={page._id}>
            {#each childrenPages as page (page._id)}
                <svelte:self page={page} on:updatePage on:deletePage on:toggleShowSubPages/>
            {/each}
        </div>
    {/if}
</div>

<style type="text/scss">
    @import "../theme";

    :global(.folder-icon svg) {
        vertical-align: middle;
    }
    :global(.gu-mirror) {
        color: $theme-text-color;
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
    .edit-container {
        display: flex;
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
