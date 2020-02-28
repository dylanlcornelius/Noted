<script>
    import MdArrowDropDown from 'svelte-icons/md/MdArrowDropDown.svelte'
    import Dropdown from './dropdown.svelte';

    export let value;
    export let list;

    $: options = list.map((option) => {
        return {
            name: option,
            action: () => {value = option;}
        }
    });
</script>

<style type="text/scss">
    .selected {
        display: flex;
        padding: 0.4em;
    }
</style>

<Dropdown options={options}>
    <div class="selected">
        {value} <span class="icon"><MdArrowDropDown/></span>
    </div>
</Dropdown>
