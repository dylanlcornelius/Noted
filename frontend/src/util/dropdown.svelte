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
        background-color: #0000002d;
    }
    .dropdown {
        position: relative;
    }
    .dropdown-container {
        position: absolute;
        border: 2px solid #505b66;
        background-color: #273b4d;
    }
    .right {
        right: 0;
    }
    .option:not(:last-child) {
        border-bottom: 2px solid #505b66;
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
