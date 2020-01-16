<script>
    import { createEventDispatcher } from 'svelte';

    export let decorated = false;
    export let selected = false;
    export let handle = false;

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
    .decorated {
        border: 1px solid #444444;
        border-radius: 3px;
        background-color: #2b3446;
        margin-right: 10px;
    }
    .selected {
		background-color: #12a0f2;
	}
    @media only screen and (min-width: 768px) {
		.button:hover {
            color: #aaa;
        }
        .decorated:hover {
        background-color: #1d2534;
        color: #eee;
    }
        .selected:hover {
            color: #444;
        }
	}
</style>

<button class="button" on:click={handleClick} class:selected class:handle class:decorated>
    <slot></slot>
</button>
