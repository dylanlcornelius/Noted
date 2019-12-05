<script>
    import { createEventDispatcher } from 'svelte';
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import MdKeyboardArrowUp from 'svelte-icons/md/MdKeyboardArrowUp.svelte';
    import MdKeyboardArrowDown from 'svelte-icons/md/MdKeyboardArrowDown.svelte';
    import Button from '../util/button.svelte';
    import TextBox from '../util/text-box.svelte';
    import { editState } from './edit-state.store.js';
    import { selectedPage } from './selected-page.store.js';
    
    export let page;

    const dispatch = createEventDispatcher();

    let showSubPages = false;

    $: selected = page.id === $selectedPage.id;

    function toggleSubPages() {
        showSubPages = !showSubPages;
    }

    function selectPage() {
        selectedPage.set(page);
    }

    function deletePage() {
        dispatch('deletePage', {
            pageId: page.id
        });
    }
</script>

<style>
    .page {
        display: flex;
        width: 100%;
    }
    .sub-navigation {   
		display: flex;
		flex-direction: column;
        padding-left: 10px;
	}
    .folder-icon {
        width: 20px;
    }
    .folder-edit {
        margin-left: 12px;
    }
    :global(.folder-icon svg) {
        vertical-align: middle;
    }
</style>

<div class="page">
    {#if page.type === 'FOLDER'}
        {#if $editState}
            <TextBox content={page.title} type={'FOLDER'}/>
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
            <TextBox content={page.title}/>
        {:else}
            <Button selected={selected} on:click={selectPage}>
                {page.title}
            </Button>
        {/if}
    {/if}
    {#if $editState}
        <div>
            <Button on:click={deletePage}>
                <div class="icon"><MdClose/></div>
            </Button>
        </div>
    {/if}
</div>

{#if showSubPages}
    <div class="sub-navigation">
        {#each page.pages as page (page.id)}
            <svelte:self page={page} on:deletePage/>
        {/each}
    </div>
{/if}
