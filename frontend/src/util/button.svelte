<script>
    import { createEventDispatcher } from 'svelte';

    export let selected = false;

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('click');
    }
</script>

<style>
    :global(.icon) {
        height: 15px;
        width: 15px;
        vertical-align: middle;
        float: right;
    }
    .button {
        display: flex;
        width: inherit;
        border: none;
        border-radius: 1px;
        background: none;
        white-space: nowrap;
        color: #eee;
        text-align: start;
        margin: 0;
    }
    .selected {
		background-color: #12a0f2;
	}
    @media only screen and (min-width: 768px) {
		.button:hover {
            color: #aaa;
        }
        .selected:hover {
            color: #444;
        }
	}
</style>

<button class="button" on:click={handleClick} class:selected={selected}>
    <slot></slot>
</button>
