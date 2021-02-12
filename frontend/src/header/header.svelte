<script>
    import RouterLink from '../router/router-link.svelte';
    import Button from '../util/button.svelte';
    import { loggedIn } from '../login/logged-in.store.js';
    import redirect from '../router/router.js';

    function logout() {
        console.log('logout');
        loggedIn.toggle();
    }
</script>

<div class="nav">
    {#if $loggedIn}
        <RouterLink path="/login" action={logout}>
            <Button>Logout</Button>
        </RouterLink>
    {/if}
</div>
<h1>Noted</h1>

<style type="text/scss">
    .nav {
        display: flex;
        justify-content: flex-end;
    }
    h1 {
        text-align: center;
        margin-top: 0;
    }
</style>
