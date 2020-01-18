<script>
    import { setContext } from 'svelte';
    import Button from '../util/button.svelte';

    let text;
    let action;
    let hide = true;

    setContext('modal', {
        open: (t, a) => {
            text = t;
            action = a;
            toggleVisibility();
        }
    });

    function handleAction() {
        action();
    }

    function toggleVisibility() {
        hide = !hide;
    }
</script>

<style>
    .hide {
        display: none;
    }
    .overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .modal {
        position: relative;
    }
    .modal-container {
        z-index: 100;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        border: 1px solid #696969;
        border-radius: 3px;
        background-color: #343434;
        box-sizing: border-box;
        box-shadow: 10px 5px 15px -2px rgba(0,0,0,0.5);
        padding: 25px;
    }
    .text {
        padding: 0.4em;
        margin-bottom: 20px;
        text-align: center;
    }
    .button-container {
        display: flex;
        float: right;
    }
</style>

<div on:click={toggleVisibility}>
    <div class="overlay" class:hide></div>
    <div class="modal" class:hide>
        <div class="modal-container">
            <h3 class="text">
                {text}
            </h3>

            <div class="button-container">
                <Button decorated={true}>
                    Cancel
                </Button>
                <Button on:click={handleAction} decorated={true}>
                    Confirm
                </Button>
            </div>
        </div>
    </div>
</div>
<slot></slot>
