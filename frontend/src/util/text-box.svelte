<script>
    import TextArea from '../util/text-area.svelte';

    export let content;
    export let type = 'CONTENT';

    let editState = false;
    
    $: notFolder = type !== 'FOLDER';

    function handleToggleEdit() {
        editState = !editState;
        // if done then save
    }
</script>

<style>
    .content {
        padding: 6px;
        white-space: pre;
    }
    .text {
        width: 100%;
        white-space: pre-wrap;
        word-break: break-all;
    }
    .container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .input {
        position: relative;
        z-index: 1;
    }
    .wide {
        width: 100%;        
    }
</style>

{#if editState}
    <span class="container" on:click={handleToggleEdit}></span>

    <span class="input" class:wide={notFolder} on:click|stopPropagation={() => {}}>
        <TextArea bind:value={content} wrap={notFolder}/>
    </span>
{:else}
    <span class="content" class:text={notFolder} on:click={handleToggleEdit}>
        {content}
    </span>
{/if}
