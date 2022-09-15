<script lang="ts">
    import {createScene} from "./model/scene";
    import {onMount} from "svelte";

    let element: HTMLElement;
    onMount(()=>{
        createScene(element);
    })
</script>

<canvas bind:this={element}></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>