<script>
    import NavigationItem from './navigation-item.svelte';
    import Button from '../util/button.svelte';
    import Input from '../util/input.svelte';
    import { editState } from './edit-state.store.js';
    import { pages } from '../page/pages.store.js';

    const pageTypes = ['FOLDER', 'LIST', 'TODO'];

    let newPageTitle = '';
    let newPageType = 'FOLDER';

    $: parentPages = $pages.filter(page => !page.parentPage);

    function addPage() {
        pages.addPage(newPageTitle, newPageType);
        newPageTitle = '';
    }
</script>

<style>
    .navigation {
		border-right: 2px solid #505b66;
        padding: 10px;
        margin: 10px;
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
        {#each parentPages as page (page.id)}
            <NavigationItem page={page}/>
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
