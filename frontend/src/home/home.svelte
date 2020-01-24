<script>
	import Navigation from '../navigation/navigation.svelte';
    import Page from '../page/page.svelte';
	import { pages } from '../page/pages.store.js';
	import { selectedPage } from '../navigation/selected-page.store.js';

	selectedPage.set($pages.find(page => page.default));
</script>

<style>
    .page {
		width: 100%;
	}
</style>

<Navigation/>
			
{#if $selectedPage}
    <div class="page">
        <Page id={$selectedPage.id} title={$selectedPage.title} type={$selectedPage.type}/>
    </div>
{/if}
