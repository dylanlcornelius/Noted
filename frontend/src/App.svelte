<script>
	import Header from './header/header.svelte';
	import Page from './page/page.svelte';

	export let name;

	let pages = [
		{title: 'Default', notes: [{id: 1, content: 'first', order: 1, completed: false}, {id: 2, content: 'second', order: 2, completed: false}], type: 'TODO', default: true},
		{title: 'Test 1', notes: [{id: 3, content: 'first', order: 1, completed: false}, {id: 4, content: 'second', order: 2, completed: false}], type: 'TODO', default: false},
		{title: 'Test 2', notes: [{id: 5, content: 'first', order: 1}, {id: 6, content: 'second', order: 2}], type: 'LIST', default: false},
		{title: 'Test 3', notes: [{id: 3, content: 'first', order: 1, completed: false}, {id: 4, content: 'second', order: 2, completed: false}], type: 'TODO', default: false},

	];

	$: defaultPage = pages.find(page => {return page.default});
	$: otherPages = pages.filter(page => {return !page.default});
</script>

<style>
	:global(body) {
		padding: 0;
	}
	.app {
		background-color: #273b4d;
		display: inline-block;	
		min-width: 100%;
		min-height: 100vh;
		color: #ececec;
		padding: 2%;
		box-sizing: border-box;
	}
	.content {
		width: 90vw;
		margin: auto;
	}
	.defaultPage {
		display: grid;
		max-width: 500px;
		margin: auto;
	}
</style>

<div class="app">
	<Header/>
	<div class="content">
		<div class="defaultPage">
			<Page title={defaultPage.title} notes={defaultPage.notes} type={defaultPage.type}/>
		</div>
		{#each otherPages as page}
			<Page title={page.title} notes={page.notes} type={page.type}/>
		{/each}
	</div>
</div>
