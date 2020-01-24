<script>
    import { createEventDispatcher } from 'svelte';
    import RouterLink from '../router/router-link.svelte';
    import Button from '../util/button.svelte';
    import Input from '../util/input.svelte';

    export let title;
    export let fields;
    export let action;
    export let links;

    const dispatch = createEventDispatcher();

    function submit() {
        const form = {};
        fields.forEach((field) => {
            form[field.key] = field.value;
        });

        let success = true;
        fields = fields.map((field) => {
            // handle blank field (all fields are required)
            field.blank = !field.value;
            if (field.blank) {
                success = false;
            }

            // handle custom validators
            if (!field.blank && field.validate) {
                const valid = !!field.validate(form);

                field.error = !valid;
                success &= valid;
            }

            return field;
        });

        if (success) {
            dispatch('submit', form);
        }
    }
</script>

<style>
    .form {
        margin: auto;
        min-width: 300px;
        padding: 15px;
        border: 1px solid #696969;
        border-radius: 3px;
        background-color: #343434;
    }
    h3 {
        text-align: center;
    }
    .field {
        margin-bottom: 10px;
    }
    .input {
        width: 100%;
        border: 1px solid #696969;
        border-radius: 3px;
    }
    .error {
        color: #cf0d0d;
        max-width: 300px;
        padding-left: 0.4em;
    }
    .links {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
</style>

<div class="form">
    <h3>{title}</h3>

    {#each fields as field}
        <div class="field">
            <div class="input">
                <Input bind:value={field.value} placeholder={field.name} type={field.type}/>
            </div>
            {#if field.blank}
                <div class="error">
                    {field.name} is required
                </div>
            {/if}
            {#if field.error}
                <div class="error">
                    {field.message}
                </div>
            {/if}
        </div>
    {/each}

    <Button on:click={submit} decorated={true}>{action}</Button>

    <div class="links">
        {#each links as link}
            <RouterLink path={link.path}>
                <Button>{link.name}</Button>
            </RouterLink>
        {/each}
    </div>
</div>
