<script>
	import Header from './header/header.svelte';
	import Navigation from './navigation/navigation.svelte';
	import Page from './page/page.svelte';
	import { selectedPage } from './navigation/selected-page.store.js';

	export let name;

	let pages = [
		{
			id: 0,
			title: 'Default',
			type: 'TODO',
			default: true,
			notes: [{id: 0, content: 'first', order: 1, completed: false}, {id: 1, content: 'second', order: 2, completed: false}],
		},
		{
			id: 1,
			title: 'Folder',
			type: 'FOLDER',
			default: false,
			notes: [],
			pages: [
				{
					id: 4,
					title: 'Sub todo',
					type: 'TODO',
					default: false,
					notes: [{id: 0, content: 'first', order: 1, completed: false}, {id: 1, content: 'second', order: 2, completed: false}],
				},
				{
					id: 5,
					title: 'Sub folder',
					type: 'FOLDER',
					default: false,
					notes: [],
					pages: [
						{
							id: 6,
							title: 'List',
							type: 'LIST',
							default: false,
							notes: [{id: 0, content: 'this', order: 1}, {id: 1, content: 'that', order: 2}]
						}
					]
				}
			]
			
		},
		{
			id: 2,
			title: 'Test 2',
			type: 'LIST',
			default: false,
			notes: [{id: 0, content: 'first', order: 1}, {id: 1, content: 'second', order: 2}],
		},
		{
			id: 3,
			title: 'Test 3',
			type: 'TODO',
			default: false,
			notes: [{id: 0, content: 'first', order: 1, completed: false}, {id: 1, content: 'second', order: 2, completed: false}],
		},
	];

	selectedPage.set(pages.find(page => page.default));

	function handleDeletePage(event) {
		pages = removePage(pages, event.detail.pageId);
	}

	function removePage(pages, id) {
		const pageIndex = pages.findIndex(page => page.id === id);

		if (pageIndex > -1) {
			return pages.filter(page => page.id !== id);
		}
		pages.forEach(page => {
			if (page.pages) {
				page.pages = removePage(page.pages, id);
			}
		});
		return pages;
	}
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
		<Navigation pages={pages} on:deletePage={handleDeletePage}/>
		
		{#if $selectedPage}
			<div class="page">
				<Page title={$selectedPage.title} notes={$selectedPage.notes} type={$selectedPage.type}/>
			</div>
		{/if}
	</div>
</div>
