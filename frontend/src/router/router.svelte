<script>
    import { get } from 'svelte/store';
    import { currentRoute } from './router.js';
    import redirect from './router.js';
    import { loggedIn } from '../login/logged-in.store';

    import Home from '../home/home.svelte';
    import Login from '../login/login.svelte';
    import ResetPassword from '../reset-password/reset-password.svelte';
    import Register from '../register/register.svelte';

    const routes = {
        '/': {component: Home, loggedIn: true},
        '/home': {component: Home, loggedIn: true},
        '/login': {component: Login, guest: true},
        '/reset-password': {component: ResetPassword, guest: true},
        '/sign-up': {component: Register, guest: true}
    };

    function handleNavigateBack(event) {
        currentRoute.set(event.state.path);
    }
    function router(route) {
        const isLoggedIn = get(loggedIn);

        // check for possible redirects
        if (!routes[route]
            || routes[route].loggedIn && !isLoggedIn
            || routes[route].guest && isLoggedIn) {

            // decide what route to redirect to
            if (isLoggedIn) {
                redirect('/', true);
                return routes['/'].component;
            }
            redirect('/login', true);
            return routes['/login'].component;
        }

        return routes[route].component;
    };
</script>

<svelte:window on:popstate={handleNavigateBack}/>
<svelte:component this={router($currentRoute)}/>
