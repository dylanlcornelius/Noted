<script>
    import { createEventDispatcher } from 'svelte';
    import PageTypes from '../navigation/page-types.js';
    import TextArea from '../util/text-area.svelte';

    export let content;
    export let editor = false;

    const dispatch = createEventDispatcher();

    let editState = false;
    
    function handleToggleEdit() {
        if (editState) {
            dispatch('update', {
                content: content
            });
        }
        editState = !editState;
    }
</script>

<style type="text/scss">
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

    <span class="input" class:wide={editor} on:click|stopPropagation={() => {}}>
        <TextArea bind:value={content} wrap={editor}/>
    </span>
{:else}
    <span class="content" class:text={editor} on:click={handleToggleEdit}>
        {content}
    </span>
{/if}
