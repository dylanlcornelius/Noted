<script>
    import NavigationItem from './navigation-item.svelte';
    import Button from '../util/button.svelte';
    import Input from '../util/input.svelte';
    import { editState } from './edit-state.store.js';

    export let pages;

    const pageTypes = ['FOLDER', 'LIST', 'TODO'];

    let newPageTitle = '';
    let newPageType = 'FOLDER';

    function addPage() {
        pages = [...pages, {
            id: pages.length,
            title: newPageTitle,
            type: newPageType,
            default: false,
            notes: [],
            pages: [],
            order: pages.length
        }];

        newPageTitle = '';
    }
</script>

<style>
    .navigation {
		border-right: 2px solid #505b66;
        padding: 10px;
        margin: 10px;
		/* display: flex;
		flex-direction: column;
        align-items: start; */
	}
    .pages {
        border-bottom: 1px solid #505b66;
    }

	@media only screen and (max-width: 767px) {
		.navigation {
			border-right: none;
			border-bottom: 1px solid #505b66;
		}
	}
</style>

<div class="navigation">
    {#if $editState}
        <select bind:value={newPageType}>
            {#each pageTypes as type}
                <option>{type}</option>
            {/each}
        </select>
        <Input placeholder="Add new page..." bind:value={newPageTitle} on:add={addPage}/>
    {/if}

    <div class="pages">
        {#each pages as page (page.id)}
            <NavigationItem page={page} on:deletePage/>
        {/each}
    </div>

    <Button on:click={editState.toggle}>
        {#if $editState}
            Done
        {:else}
            Edit
        {/if}
    </Button>
</div>
