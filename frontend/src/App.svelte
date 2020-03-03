<script>
	import Modal from './util/modal.svelte';
	import Header from './header/header.svelte';
	import Router from './router/router.svelte';
	import { pages } from './page/pages.store.js';
	import { notes } from './note/notes.store.js';
	import { selectedPage } from './navigation/selected-page.store';
	import { upsertData, getAllData } from './util/indexed-db';

	upsertData('pages', [
		{id: 0, title: 'Default', type: 'Todo', default: true, order: 0},	
		{id: 1, title: 'Folder', type: 'Folder', open: false, order: 2, childPages: [4, 5]},
		{id: 4, title: 'Sub todo', type: 'Todo', default: false,order: 0, parentPage: 1},
		{id: 5, title: 'Sub folder', type: 'Folder', open: true, order: 1, parentPage: 1, childPages: [6]},
		{id: 6, title: 'Note', type: 'Note', default: false, order: 0, parentPage: 5},
		{id: 2, title: 'Test Note', type: 'Note', default: false, order: 1},
		{id: 3, title: 'Test 3', type: 'Todo', default: false, order: 3},
	]);
	getAllData('pages').then(data => {
		pages.set(data);
		selectedPage.set($pages.find(page => page.default));
	});

	upsertData('notes', [
		{id: 0, content: 'first', order: 0, completed: true, page: 0},
		{id: 1, content: 'second', order: 1, completed: false, page: 0},
		{id: 9, content: 'third', order: 2, completed: false, page: 0},
		{id: 2, content: 'sub 1', order: 0, completed: false, page: 4},
		{id: 3, content: 'sub 2', order: 1, completed: false, page: 4},
		{id: 4, content: 'this note', order: 0, page: 6},
		{id: 6, content: 'test note', order: 0, page: 2},
		{id: 8, content: 'first 3', order: 0, completed: false, page: 3},
	]);
	getAllData('notes').then(data => {
		notes.set(data);
	});
</script>

<style type="text/scss">
	@import "theme";

	:global(body) {
		padding: 0;
		overflow: auto;
	}
	.app {
		background-color: $theme-background-color;
		color: $theme-text-color;
		display: inline-block;	
		width: 100%;
		min-height: 100vh;
		padding: 2%;
		box-sizing: border-box;
	}
</style>

<div class="app">
	<Modal>
		<Header/>
		<Router/>
	</Modal>
</div>
