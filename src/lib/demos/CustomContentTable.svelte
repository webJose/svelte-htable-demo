<script lang="ts">
	import Htable, { StdCell, type Column } from "svelte-htable";
    import type { DataItem } from "../../data";
    import DemoControls from "$lib/DemoControls.svelte";
	
	const columns: (Column & { uom?: string })[] = [
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
            title: "Birth Date",
            renderValue: (i, k) => new Date(i[k]).toLocaleDateString(),
        },
        {
            key: "age",
            title: "Age",
            renderValue: (i, k) => {
                const diff = Date.now() - Date.parse(i.birth_date);
                return Math.floor(
                    diff / (365 * 24 * 60 * 60 * 1000)
                ).toString();
            },
        },
        {
            key: "gender",
            title: "Gender",
        },
        {
            key: "weight",
            title: "Weight",
            uom: "kg",
            renderValue: (i, k) => {
                const baseWeight = 50;
                if (Math.random() < 0.3) {
                    return '';
                }
                return `${baseWeight + Math.random() * (100 - baseWeight)}`;
            }
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

    let stdCell = false;
</script>
<DemoControls>
	<label>
		<input type="radio" bind:group={stdCell} value={false} />&nbsp;No <code>StdCell</code>
	</label>
	<label>
		<input type="radio" bind:group={stdCell} value={true} />&nbsp;Using <code>StdCell</code>
	</label>
</DemoControls>
{#if !stdCell}
    <Htable class="data5" {columns} {items} nullText="(null)">
        <svelte:fragment slot="summary" let:item>
            <img
                    class="flag"
                    src="https://flagcdn.com/{item.country_code.toLowerCase()}.svg"
                    alt={item.country_code}
                    />&nbsp;{item.last_name},&nbsp;{item.first_name}
        </svelte:fragment>
        <svelte:fragment slot="headercell" let:col>
            {#if col.key === 'weight'}
                {col.title} ({col.uom})
            {:else}
                {col.title}
            {/if}
        </svelte:fragment>
        <svelte:fragment slot="datacell" let:item let:col let:renderValue>
            {renderValue(item, col.key)}
        </svelte:fragment>
    </Htable>
{:else}
    <Htable class="data5" {columns} {items} nullText="(null)">
        <svelte:fragment slot="summary" let:item>
            <img
                    class="flag"
                    src="https://flagcdn.com/{item.country_code.toLowerCase()}.svg"
                    alt={item.country_code}
                    />&nbsp;{item.last_name},&nbsp;{item.first_name}
        </svelte:fragment>
        <svelte:fragment slot="headercell" let:col>
            {#if col.key === 'weight'}
                {col.title} ({col.uom})
            {:else}
                {col.title}
            {/if}
        </svelte:fragment>
        <svelte:fragment slot="datacell" let:item let:col let:renderValue>
            <StdCell itemData={renderValue(item, col.key)} />
        </svelte:fragment>
    </Htable>
{/if}

<style>
	:global(table.data5) {
		border: 0.2em solid darkblue;
	}

    :global(table.data5 td) {
        border: 1px solid darkblue;
    }
	
	:global(table.data5 th) {
		color: white;
		font-weight: bold;
		background-color: darkblue;
		padding-left: 1.5em;
		padding-right: 1.5em;
	}
	
	:global(table.data5 summary) {
		font-style: italic;
	}
	
	:global(table.data5 tr.even) {
		background-color: rgb(231, 228, 249);
	}
	
	:global(table.data5 tr.odd) {
		background-color: white;
	}
	
	img.flag {
		max-height: 1em;
	}
</style>