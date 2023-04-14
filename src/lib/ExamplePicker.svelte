<script lang="ts" context="module">
	export type Example = {
		key: string,
		title: string,
		codeFile: string,
		detail: ComponentType,
		component: ComponentType
	};
</script>
<script lang="ts">
	import { createEventDispatcher, type ComponentType } from "svelte";
	import config from "../config";

	export let examples: Example[];
	
	const dispatch = createEventDispatcher();
	let selectedSample: Example;
	
	function onSampleSelect(sample: Example) {
		selectedSample = sample;
	}
</script>
<p>
	Use the buttons below to run the examples.  Ideally, you read them in order as one example usually builds upon the previous one.
</p>
<div class="button-picker">
	{#each examples as sample (sample.key)}
		<button on:click={() => onSampleSelect(sample)}>
			{sample.title}
		</button>
	{/each}
</div>
{#if selectedSample}
	<div class="sample-detail">
		<h3>
			{selectedSample.title}
		</h3>
		<span class="code-file">
			<span>Code File</span>&nbsp;
			<em><a href={config.sourceCode.demos.demo({fileName: selectedSample.codeFile})} target="_blank">{selectedSample.codeFile}</a></em>
		</span>
			<svelte:component this={selectedSample.detail} />
			<button on:click={() => dispatch('sampleSelect', selectedSample)}>
				Ok, run!
		</button>
	</div>
{/if}

<style>
	div.button-picker {
		padding: 1em 2em;
		border-radius: 0.5em;
		background-color: rgb(195, 223, 254);
		display: flex;
		flex-flow: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5em;
	}
	
	button {
		background-color: darkred;
		border: 1px solid red;
		color: white;
		font-weight: bold;
		padding: 0.5em 1.2em;
		border-radius: 0.4em;
	}
	
	div.button-picker > button {
		margin: 0;
	}
	
	div.sample-detail {
		border: 0.1em dashed  lightblue;
		border-radius: 0.5em;
		padding: 1em 2em;
		margin: 1em 0;
	}
	
	span.code-file > span {
		padding: 0.3em 1em;
		background-color: rgb(195, 223, 254);
		border-radius: 0.7em;
		color: darkred;
		font-weight: bold;
	}
	
	span.code-file > em {
		padding: 0.3em 1em;
		font-style: normal;
		font-family: monospace;
		font-size: larger;
		border: 0.15em solid rgb(195, 223, 254);
		border-radius: 0.7em;
	}
</style>