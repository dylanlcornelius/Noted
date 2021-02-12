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

<button class="button" on:click={handleClick} class:selected class:handle class:decorated>
    <slot></slot>
</button>

<style type="text/scss">
    @import "../theme";

    :global(.icon) {
        height: 15px;
        width: 15px;
        vertical-align: middle;
        float: right;
    }
    .button {
        border-radius: 2px;
        display: flex;
        width: inherit;
        border: none;
        background: none;
        white-space: nowrap;
        color: $theme-text-color;
        text-align: start;
        margin: 0;
        transform: perspective(1px) translateZ(0);
        transition-duration: 0.2s;
        transition-property: color, background-color;
    }
    .decorated {
        background-color: $theme-primary-color;
        color: $theme-text-dark-color;
        margin-right: 10px;
        font-weight: 600;
    }
    .selected {
        background-color: $theme-selected-color;
	}
    @media only screen and (min-width: 768px) {
		.button:hover {
            color: $theme-text-hover-color;
        }
        .decorated:hover {
            background-color: $theme-primary-hover-color;
            color: $theme-text-color;
        }
        .selected:hover {
            background-color: $theme-selected-hover-color;
            color: $theme-text-color;
        }
	}
</style>
