<script>
	import Header from './header/header.svelte';
	import PageNavigation from './page/page-navigation.svelte';
	import Page from './page/page.svelte';

	export let name;

	let pages = [
		{
			id: 1,
			title: 'Default',
			type: 'TODO',
			default: true,
			notes: [{id: 1, content: 'first', order: 1, completed: false}, {id: 2, content: 'second', order: 2, completed: false}],
		},
		{
			id: 2,
			title: 'Folder',
			type: 'FOLDER',
			default: false,
			notes: [],
			pages: [
				{
					id: 5,
					title: 'Sub todo',
					type: 'TODO',
					default: false,
					notes: [{id: 3, content: 'first', order: 1, completed: false}, {id: 4, content: 'second', order: 2, completed: false}],
				},
				{
					id: 6,
					title: 'Sub folder',
					type: 'FOLDER',
					default: false,
					notes: [],
					pages: [
						{
							id: 7,
							title: 'List',
							type: 'LIST',
							default: false,
							notes: [{id: 3, content: 'this', order: 1}, {id: 4, content: 'that', order: 2}]
						}
					]
				}
			]
			
		},
		{
			id: 3,
			title: 'Test 2',
			type: 'LIST',
			default: false,
			notes: [{id: 5, content: 'first', order: 1}, {id: 6, content: 'second', order: 2}],
		},
		{
			id: 4,
			title: 'Test 3',
			type: 'TODO',
			default: false,
			notes: [{id: 3, content: 'first', order: 1, completed: false}, {id: 4, content: 'second', order: 2, completed: false}],
		},
	];

	let selectedPage = pages.find(page => page.default);

	function handleSelectPage(event) {
		selectedPage = event.detail.page;
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
	.navigation {
		border-right: 1px solid #505b66;
        padding: 10px;
        margin: 10px;
		display: flex;
		flex-direction: column;
        align-items: start;
	}
	.page {
		width: 100%;
	}
	@media only screen and (max-width: 767px) {
		.content {
			display: block;
		}
		.navigation {
			border-right: none;
			border-bottom: 1px solid #505b66;
		}
	}
</style>

<div class="app">
	<Header/>
	<div class="content">
		<div class="navigation">
			{#each pages as page (page.id)}
				<PageNavigation page={page} selectedPage={selectedPage} on:selectPage={handleSelectPage}/>
			{/each}
		</div>
		
		<div class="page">
			<Page title={selectedPage.title} notes={selectedPage.notes} type={selectedPage.type}/>
		</div>
	</div>
</div>
