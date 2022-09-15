<script lang="ts">
    import {createScene} from "./model/scene";
    import {onMount} from "svelte";

    let element: HTMLElement;
    onMount(()=>{
        createScene(element);
    })
</script>
<div class="fps"></div>
<canvas bind:this={element}></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
    .fps {
        position: absolute;
        right: 20px;
        top: 20px;
        padding: 10px 20px;
        font-size: 1.3rem;
    }
</style>