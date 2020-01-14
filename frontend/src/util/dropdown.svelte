<script>
    import Button from '../util/button.svelte';

    export let options;
    export let right = false;

    let hide = true;

    function toggleVisibility() {
        hide = !hide;
    }
</script>

<style>
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
        border: 1px solid #999;
        background-color: #273b4d;
        box-sizing: border-box;
        min-width: 100%;
        box-shadow: 3px 5px 15px -2px rgba(0,0,0,0.5);
    }
    .right {
        right: 0;
    }
    .option:not(:last-child) {
        border-bottom: 1px solid #505b66;
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
