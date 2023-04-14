<script lang="ts">
    import Spinner from "$lib/Spinner.svelte";
	import ExamplePicker, { type Example } from "$lib/ExamplePicker.svelte";
	import BasicTableDetail from "$demos/BasicTableDetail.svelte";
	import BasicTable from "$demos/BasicTable.svelte";
	import SummaryTable from "$demos/SummaryTable.svelte";
	import SummaryTableDetail from "$demos/SummaryTableDetail.svelte";
	import DataStylingTable from "$demos/DataStylingTable.svelte";
	import DataStylingTableDetail from "$demos/DataStylingTableDetail.svelte";
	import DataFormattingTable from "$demos/DataFormattingTable.svelte";
	import DataFormattingTableDetail from "$demos/DataFormattingTableDetail.svelte";
	import CustomContentTable from "$demos/CustomContentTable.svelte";
	import CustomContentTableDetail from "$demos/CustomContentTableDetail.svelte";
	import RowSlotTable from "$demos/RowSlotTable.svelte";
	import RowSlotDetail from "$demos/RowSlotDetail.svelte";
	import FunctionalityTable from "$demos/FunctionalityTable.svelte";
	import FunctionalityTableDetail from "$demos/FunctionalityTableDetail.svelte";

    import type { DataItem } from "../data";
	
	const examples: Example[] = [
		{
			key: 'basic',
			title: 'Basic Table',
			codeFile: 'BasicTable.svelte',
			detail: BasicTableDetail,
			component: BasicTable
		},
		{
			key: 'summary',
			title: 'Summary',
			codeFile: 'SummaryTable.svelte',
			detail: SummaryTableDetail,
			component: SummaryTable
		},
		{
			key: 'data-styling',
			title: 'Data Styling',
			codeFile: 'DataStylingTable.svelte',
			detail: DataStylingTableDetail,
			component: DataStylingTable
		},
		{
			key: 'data-formatting',
			title: 'Data Formatting',
			codeFile: 'DataFormattingTable.svelte',
			detail: DataFormattingTableDetail,
			component: DataFormattingTable
		},
		{
			key: 'custom-content',
			title: 'Custom Content',
			codeFile: 'CustomContentTable.svelte',
			detail: CustomContentTableDetail,
			component: CustomContentTable
		},
		{
			key: 'row-slot',
			title: 'Row Slot',
			codeFile: 'RowSlotTable.svelte',
			detail: RowSlotDetail,
			component: RowSlotTable
		},
		{
			key: 'functionality',
			title: 'Functionality',
			codeFile: 'FunctionalityTable.svelte',
			detail: FunctionalityTableDetail,
			component: FunctionalityTable
		},
		{
			key: 'caption',
			title: 'Caption',
			codeFile: 'CaptionTable.svelte',
			detail: DataFormattingTableDetail,
			component: DataFormattingTable
		},
		{
			key: 'caption-formatting',
			title: 'Caption Formatting',
			codeFile: 'CaptionFormattingTable.svelte',
			detail: DataFormattingTableDetail,
			component: DataFormattingTable
		},
	];
	let currentSample: Example;
	let dataLoading = false;
	let dataPromise: Promise<any>;
	let numItems = 500;
	
	function runSample(sample: Example) {
		currentSample = sample;
	}
	
	async function loadData() {
    const response = await fetch(`https://my.api.mockaroo.com/employees.json?records=${numItems}`, {
        headers: {
            "x-api-key": "a53dac10"
        }
    });
		const rawData = await response.json();
		return buildData(rawData);
	}

	function buildData(rawData: DataItem[]) {
		const managers: { [x: number | string]: DataItem } = {};
		for (let item of rawData) {
			item.subItems = [];
			managers[item.id] = item;
		}
		return rawData.reduce((prev, curr) => {
			if (curr.manager_id) {
				managers[curr.manager_id]?.subItems?.push(curr);
			} else {
				prev.push(curr);
			}
			return prev;
		}, ([] as DataItem[]));
	}
	
	function start() {
		dataLoading = true;
		dataPromise = loadData();
	}
</script>
<main>
	<hgroup>
		<h1>
			svelte-htable
		</h1>
		<h4>
			Demonstration
		</h4>
	</hgroup>
	<article>
		<div>
			{#if !dataLoading}
				<div class="warning">
					<p>
						This REPL fetches live data from <strong>mockaroo.com</strong> using a free key.  As a courtesy to others, minimize your edit/test cycle as much as you can.
					</p>
					<p>
						The free key can only do 200 fetches per day.  Please have this in mind at all times.
					</p>
					<button on:click={start}>
						Ok, I will minimize my editing.  Load the data, please!
					</button>
					<input type="number" bind:value={numItems} step="10" min="150" max="500" on:keypress|preventDefault /> items
				</div>
			{:else}
				{#await dataPromise}
					<Spinner />
				{:then}
					<ExamplePicker on:sampleSelect={e => runSample(e.detail)} {examples} />
				{/await}
			{/if}
		</div>
		{#await dataPromise then items}
			{#if currentSample}
				<div>
					<h2>
						{currentSample.title}
					</h2>
					<p class="sample-size">Sample size: {numItems}</p>
					<svelte:component this={currentSample.component} {items} />
				</div>
			{/if}
		{/await}
	</article>
</main>

<style>
    :global(body) {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

	article {
		display: flex;
		flex-flow: column;
	}

	@media screen and (min-width: 1800px) {
		article {
			flex-flow: row;
			justify-content: space-between;
			gap: 1em;
		}
		article > div:nth-child(2) {
			min-width: 60%;
		}
	}

	hgroup {
		display: flex;
		flex-flow: column;
		align-items: center;
		background-color: lightgray;
		border-radius: 1em;
		padding: 1em 0;
	}
	
	hgroup > * {
		margin: 0;
	}
	
	:global(code) {
		padding: 0.2em 0.4em;
		border-radius: 0.3em;
		background-color: rgb(223, 223, 223);
		font-weight: bolder;
	}
	
	div.warning {
		background-color: yellow;
		padding: 1em 2em;
		margin-top: 1em;
		margin-left: auto;
		margin-right: auto;
		border-radius: 1em;
	}
	
	div.warning button {
		border-radius: 0.5em;
		padding: 0.5em 1.5em;
		background-color: orange;
		border: 0.15em solid orangered;
		cursor: pointer;
	}
	
	div.warning input[type=number] {
		max-width: 4em;
	}

	p.sample-size {
		font-size: smaller;
		font-weight: bold;
	}
</style>