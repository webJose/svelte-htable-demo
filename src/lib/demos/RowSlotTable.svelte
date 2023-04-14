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

    let ageThreshold = 40;
    let cssClasses = false;
</script>
<DemoControls>
    <label>
        Highlight employees older than <input type="number" max="100" min="25" step="1" bind:value={ageThreshold} on:keypress|preventDefault /> years.
    </label>
    <br />
    <label>
        <input type="checkbox" bind:value={cssClasses} />&nbsp;Revive the <code>even</code> and <code>odd</code> CSS classes
    </label>
</DemoControls>
<Htable class="data6" {columns} {items} nullText="(null)">
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
    <svelte:fragment slot="datarow" let:item let:index let:renderValue>
        {@const age = +columns[4].renderValue(item, 'age')}
        {@const highlighted = age >= ageThreshold}
        <tr class:odd={cssClasses && index % 2 === 1} class:even={cssClasses && index % 2 === 0} class:highlight={highlighted}>
            {#each columns as col (col.key)}
                {@const renderCell = col.renderValue ?? renderValue}
                {#if highlighted && col.key === 'birth_date'}
                    <td colspan="2" style="text-align: center;">
                        {renderCell(item, col.key)}&nbsp;<span style="font-size: larger; font-weight: bold">+{age - ageThreshold}</span>
                    </td>
                {:else if !highlighted || col.key != 'age'}
                    <td><StdCell itemData={renderCell(item, col.key)} /></td>
                {/if}
            {/each}
        </tr>
    </svelte:fragment>
</Htable>

<style>
	:global(table.data6) {
		border: 0.2em solid darkblue;
	}
	
	:global(table.data6 th) {
		color: white;
		font-weight: bold;
		background-color: darkblue;
		padding-left: 1.5em;
		padding-right: 1.5em;
	}
	
	:global(table.data6 summary) {
		font-style: italic;
	}
	
	:global(table.data6 tr.even) {
		background-color: rgb(231, 228, 249);
	}
	
	:global(table.data6 tr.odd) {
		background-color: white;
	}
	
	img.flag {
		max-height: 1em;
	}
    tr.highlight {
        background-color: darkgreen !important;
        color: white;
    }
</style>