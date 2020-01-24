<script>
    import Form from '../util/form.svelte';
    import { loggedIn } from './logged-in.store.js';
    import redirect from '../router/router.js';

    const fields = [
        {name: 'Email', key: 'email', value: ''},
        {name: 'Password', key: 'password', value: '', type: 'password'}
    ];
    const links = [
        {name: 'Sign up', path: '/sign-up'},
        {name: 'Forgot your password?', path: '/reset-password'}
    ]

    function login(event) {
        console.log(event.detail.email, event.detail.password);
        redirect('/');
        loggedIn.toggle();
    }
</script>

<Form title={'Login'} fields={fields} action={'Go!'} links={links} on:submit={login}/>
