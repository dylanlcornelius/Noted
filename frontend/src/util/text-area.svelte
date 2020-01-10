<script>
    export let value;
    export let wrap;
</script>

<style>
    .container {
        position: relative;
        height: 100%;
    }
    pre {
        min-height: 33px;
        max-height: auto;
        color: transparent;
        height: 100%;
    }
    pre, textarea {
        font-family: inherit;
        padding: 5px;
        box-sizing: border-box;
        border: solid 1px rgb(13, 121, 221);
        border-radius: 3px;
        line-height: normal;
        overflow: hidden;
        margin: 0;
        word-break: break-all;
    }
    .wrap {
        white-space: pre-wrap;
    }
    textarea {
        background: none;
        color: #ececec;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        resize: none;
    }
    textarea:focus {
        outline: none;
    }
</style>

<div class="container">
    <pre class:wrap aria-hidden="true">{value + '\n'}</pre>
    <!-- svelte-ignore a11y-autofocus -->
    <textarea bind:value autofocus/>
</div>
