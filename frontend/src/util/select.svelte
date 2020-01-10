<script>
    export let value;
    export let list;
</script>

<style>
    select {
        background: none;
        border: none;
        color: white;
        padding: 0;
    }
    select:focus {
        outline: none;
    }
    option {
        background-color: #3a3a3a;
        color: white;
    }
    option:focus {
        outline: none;
    }
</style>

<select bind:value>
    {#each list as item}
        <option>{item}</option>
    {/each}
</select>
