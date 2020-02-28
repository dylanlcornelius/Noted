<script>
    import redirect from './router.js';

    export let path = '/';
    export let action = () => {};

    function handleRedirect() {
        redirect(path);
        action();
    }
</script>

<style type="text/scss">
    a {
        text-decoration: none;
        color: inherit;
    }
    a:visited {
        color: inherit;
    }
</style>

<a href={path} on:click|preventDefault={handleRedirect}>
    <slot></slot>
</a>
