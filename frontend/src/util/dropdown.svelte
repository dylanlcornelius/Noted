<script>
    import Button from '../util/button.svelte';

    export let options;
    export let right = false;

    let hide = true;

    function toggleVisibility() {
        hide = !hide;
    }
</script>

<style type="text/scss">
    @import "../theme";

    .hide {
        display: none;
    }
    .overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        /* background-color: #0000002d; */
    }
    /* two dropdown containers needed so the dropdown can be left or right aligned */
    .dropdown {
        position: relative;
    }
    .dropdown-container {
        position: absolute;
        border-radius: 2px;
        background-color: $theme-background-alternative-color;
        box-sizing: border-box;
        min-width: 100%;
        box-shadow: 3px 4px 10px 0px rgba(0, 0, 0, 0.5);
    }
    .right {
        right: 0;
    }
    .option:not(:last-child) {
        border-bottom: 1px solid $theme-border-alternative-color;
    }
</style>

<div on:click={toggleVisibility}>
    <slot></slot>

    <div class="overlay" class:hide></div>
    <div class="dropdown" class:hide>
        <div class="dropdown-container" class:right>
            {#each options as option}
                <div class="option">
                    <Button on:click={option.action}>
                        {option.name}
                    </Button>
                </div>
            {/each}
        </div>
    </div>
</div>
