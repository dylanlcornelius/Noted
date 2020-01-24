<script>
    import Form from '../util/form.svelte';

    const fields = [
        {name: 'First Name', key: 'firstName', value: ''},
        {name: 'Last Name', key: 'lastName', value: ''},
        {name: 'Email', key: 'email', value: '', message: 'Not a valid email', validate: (form) => {
            return form['email'].match('(?=.*[@]).*');
        }},
        {name: 'Password', key: 'password', value: '', type: 'password', message: 'Passwords must have a number, uppercase letter, and at least 8 characters', validate: (form) => {
            return form['password'].match('^(?=.*[A-Z])(?=.*[0-9])(?=.{6,})[A-Za-z0-9]+$');
        }},
        {name: 'Confirm Password', key: 'confirmPassword', value: '', type: 'password', message: 'Passwords must match!', validate: (form) => {
            return form['password'] === form['confirmPassword'];
        }}
    ];
    const links = [
        {name: 'Already have an account?', path: '/login'},
    ]

    function register(event) {
        console.log(event.detail);
    }
</script>

<Form title={'Sign Up'} fields={fields} action={'Submit'} links={links} on:submit={register}/>
