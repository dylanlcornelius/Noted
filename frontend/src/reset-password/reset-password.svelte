<script>
    import Form from '../util/form.svelte';

    const fields = [
        {name: 'Email', key: 'email', value: ''}
    ];
    const links = [
        {name: 'Back', path: '/login'},
    ]

    function resetPassword(event) {
        console.log(event.detail.email);
    }
</script>

<Form title={'Reset Password'} fields={fields} action={'Reset!'} links={links} on:submit={resetPassword}/>
