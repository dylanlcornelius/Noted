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

<style>
    .selected {
        display: flex;
        border: 1px solid #999;
        padding: 0.4em;
    }
</style>

<Dropdown options={options}>
    <div class="selected">
        {value} <span class="icon"><MdArrowDropDown/></span>
    </div>
</Dropdown>
