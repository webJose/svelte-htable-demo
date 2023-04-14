<script lang="ts">
	import Htable, { type Column } from "svelte-htable";
    import type { DataItem } from "../../data";
    import DemoControls from "$lib/DemoControls.svelte";
	
	const columns: Column[] = [
        {
            key: "id",
            title: "ID",
        },
        {
            key: "first_name",
            title: "First Name",
        },
        {
            key: "last_name",
            title: "Last Name",
        },
        {
            key: "birth_date",
            title: "Birth Date"
        },
        {
            key: "gender",
            title: "Gender",
        },
        {
            key: "country_code",
            title: "Country Code",
        },
        {
            key: "manager_id",
            title: "Manager's ID",
        },
	];
	export let items: DataItem[];
	
	let summarySlot = true;
</script>
<DemoControls>
	<label>
		<input type="radio" bind:group={summarySlot} value={true} />&nbsp;Use the <code>summary</code> slot
	</label>
	<label>
		<input type="radio" bind:group={summarySlot} value={false} />&nbsp;Use the <code>summary</code> prop
	</label>
</DemoControls>
{#if summarySlot}
	<Htable class="data2" {columns} {items}>
		<svelte:fragment slot="summary" let:item>
			<img
					 class="flag"
					 src="https://flagcdn.com/{item.country_code.toLowerCase()}.svg"
					 alt={item.country_code}
					 />&nbsp;{item.last_name},&nbsp;{item.first_name}
		</svelte:fragment>
	</Htable>
{:else}
	<Htable class="data2" {columns} {items} summary={i => `${i.last_name}, ${i.first_name}`} />
{/if}

<style>
	:global(table.data2) {
		border: 0.2em solid darkblue;
	}
	
	:global(table.data2 th) {
		color: white;
		font-weight: bold;
		background-color: darkblue;
		padding-left: 1.5em;
		padding-right: 1.5em;
	}
	
	:global(table.data2 summary) {
		font-style: italic;
	}
	
	img.flag {
		max-height: 1em;
	}
</style>