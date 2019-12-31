<script>
	import Header from './header/header.svelte';
	import Navigation from './navigation/navigation.svelte';
	import Page from './page/page.svelte';
	import { pages } from './page/pages.store.js';
	import { notes } from './note/notes.store.js';
	import { selectedPage } from './navigation/selected-page.store.js';

	export let name;

	pages.set([
		{
			id: 0,
			title: 'Default',
			type: 'TODO',
			default: true,
			order: 0
		},
		{
			id: 1,
			title: 'Folder',
			type: 'FOLDER',
			default: false,
			order: 2,
			childPages: [4, 5],
		},
		{
			id: 4,
			title: 'Sub todo',
			type: 'TODO',
			default: false,
			order: 0,
			parentPage: 1,
		},
		{
			id: 5,
			title: 'Sub folder',
			type: 'FOLDER',
			default: false,
			order: 1,
			parentPage: 1,
			childPages: [6],
		},
		{
			id: 6,
			title: 'List',
			type: 'LIST',
			default: false,
			order: 0,
			parentPage: 5,
		},
		{
			id: 2,
			title: 'Test 2',
			type: 'LIST',
			default: false,
			order: 1,
		},
		{
			id: 3,
			title: 'Test 3',
			type: 'TODO',
			default: false,
			order: 3,
		},
	]);

	selectedPage.set($pages.find(page => page.default));

	notes.set([
		{id: 0, content: 'first', order: 0, completed: true, page: 0},
		{id: 1, content: 'second', order: 1, completed: false, page: 0},
		{id: 9, content: 'third', order: 2, completed: false, page: 0},
		{id: 2, content: 'sub 1', order: 0, completed: false, page: 4},
		{id: 3, content: 'sub 2', order: 1, completed: false, page: 4},
		{id: 4, content: 'this', order: 0, page: 6},
		{id: 5, content: 'that', order: 1, page: 6},
		{id: 6, content: 'first 2', order: 0, page: 2},
		{id: 7, content: 'second 2', order: 1, page: 2},
		{id: 8, content: 'first 3', order: 0, completed: false, page: 3},
	]);
</script>

<style>
	:global(body) {
		padding: 0;
		overflow: auto;
	}
	.app {
		background-color: #273b4d;
		display: inline-block;	
		width: 100%;
		min-height: 100vh;
		color: #ececec;
		padding: 2%;
		box-sizing: border-box;
	}
	.content {
		width: 90%;
		margin: auto;
		display: flex;
	}
	.page {
		width: 100%;
	}
	@media only screen and (max-width: 767px) {
		.content {
			width: 100%;
			display: block;
		}
	}
</style>

<div class="app">
	<Header/>
	<div class="content">
		<Navigation/>
		
		{#if $selectedPage}
			<div class="page">
				<Page id={$selectedPage.id} title={$selectedPage.title} type={$selectedPage.type}/>
			</div>
		{/if}
	</div>
</div>
