<script>
    import { createEventDispatcher } from 'svelte';

    export let page;
    export let selectedPage;

    const dispatch = createEventDispatcher();

    let showSubPages = false;

    function toggleSubPages() {
        showSubPages = !showSubPages;
    }

    function selectPage() {
        dispatch('selectPage', {
            page: page
        })
    }
</script>

<style>
    .navigation-button {
        min-width: 60px;
        border: none;
        border-radius: 1px;
        background: none;
        white-space: nowrap;
        color: #eee;
        text-align: start;
    }
    .navigation-button:hover {
        color: #aaa;
    }
    .selected {
		background-color: #12a0f2;
	}
    .selected:hover {
        color: #444;
    }
    .navigation {
		display: flex;
		flex-direction: column;
        padding-left: 15px;
	}
</style>

{#if page.pages}
    <button class="navigation-button" on:click={toggleSubPages}>
        {page.title}
    </button>
    {#if showSubPages}
        <div class="navigation">
            {#each page.pages as page (page.id)}
                <svelte:self page={page} selectedPage={selectedPage} on:selectPage/>
            {/each}
        </div>
    {/if}
{:else}
    <button class="navigation-button" on:click={selectPage} class:selected={page.id === selectedPage.id}>{page.title}</button>
{/if}
