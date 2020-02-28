<script>
	import { fade } from 'svelte/transition';
	import Navigation from '../navigation/navigation.svelte';
    import Page from '../page/page.svelte';
	import { pages } from '../page/pages.store.js';
	import { selectedPage } from '../navigation/selected-page.store.js';

	selectedPage.set($pages.find(page => page.default));
</script>

<style type="text/scss">
	@import "../theme";

	.container {
		background-color: $theme-background-secondary-color;
		border-radius: 3px;
		box-shadow: 5px 7px 10px 0px rgba(0,0,0,0.6);
		width: 90%;
		margin: auto;
		display: flex;
		overflow: hidden;
	}
    .page {
		width: 100%;
	}
	@media only screen and (max-width: 767px) {
		.container {
			width: 100%;
			display: block;
		}
	}
</style>

<div class="container" in:fade="{{duration: 1000}}">
	<Navigation/>
				
	{#if $selectedPage}
		<div class="page">
			<Page id={$selectedPage.id} title={$selectedPage.title} type={$selectedPage.type}/>
		</div>
	{/if}
</div>
