<script>
    import { onMount } from 'svelte';
    import dragula from 'dragula';
    import PageTypes from './page-types.js';
    import NavigationItem from './navigation-item.svelte';
    import Button from '../util/button.svelte';
    import Input from '../util/input.svelte';
    import Select from '../util/select.svelte';
    import { editState } from './edit-state.store.js';
    import { pages } from '../page/pages.store.js';

    let newPageTitle = '';
    let newPageType = PageTypes.FOLDER;
    let drake;

    $: parentPages = $pages.filter(page => !page.parentPage).sort((a, b) => a.order - b.order);

    function addPage() {
        pages.addPage(newPageTitle, newPageType);
        newPageTitle = '';
    }

    function initDND() {
        if (drake) {
            drake.destroy();
        }

        drake = dragula([].slice.apply(document.querySelectorAll('.pages')), {
            copySortSource: true,
            revertOnSpill: true,
            moves: (el, container, handle) => {
                return typeof handle.className === 'string' ? handle.className.includes('handle') : false;
            },
            accepts: (el, target, source) => {
                return !el.contains(target);
            }
        });

        drake.on('drop', (el, target, source, sibling) => {
            pages.updateOrder(el.id, [].slice.call(el.parentNode.children).findIndex((item) => el === item), target.id, source.id);
        });
    }

    onMount(() => {
        initDND();
    });
</script>

<style type="text/scss">
    @import "../theme";

    .navigation {
		border-right: 2px solid $theme-border-color;
        padding: 10px;
        margin: 10px;
	}
    .new-page-container {
        display: flex;
    }
    .pages {
        border-bottom: 1px solid $theme-border-color;
    }
	@media only screen and (max-width: 767px) {
		.navigation {
			border-right: none;
			border-bottom: 1px solid $theme-border-color;
		}
	}
</style>

<div class="navigation">
    {#if $editState}
        <div class="new-page-container">
            <Select bind:value={newPageType} list={Object.values(PageTypes)}/>
            <Input placeholder="Add new page..." bind:value={newPageTitle} on:add={addPage}/>
        </div>
    {/if}

    <div class="pages">
        {#each parentPages as page (page.id)}
            <NavigationItem page={page} on:toggleShowSubPages={initDND}/>
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
