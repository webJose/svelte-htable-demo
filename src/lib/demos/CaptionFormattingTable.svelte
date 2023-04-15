<script lang="ts">
	import Htable, { CaptionOrder, type Column } from "svelte-htable";
    import type { DataItem } from "../../data";
    import DemoControls from "$lib/DemoControls.svelte";
    import { scale } from "svelte/transition";
	
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
            key: "country_code",
            title: "Country Code",
        },
        {
            key: "manager_id",
            title: "Manager's ID",
        },
	];
	export let items: DataItem[];
</script>
<Htable
    class="data9"
    {columns}
    {items}
    nullText="(null)"
    level={l => `Level: ${l}`}
    showPath={true}
    captionOrder={CaptionOrder.LevelPath}
    pathSegment="last_name"
    pathSeparator=" > "
>
    <svelte:fragment slot="summary" let:item>
        <img
                class="flag"
                src="https://flagcdn.com/{item.country_code.toLowerCase()}.svg"
                alt={item.country_code}
                />&nbsp;{item.last_name},&nbsp;{item.first_name}
    </svelte:fragment>
</Htable>

<style>
	:global(table.data9) {
		border: 0.2em solid darkblue;
	}
	
	:global(table.data9 th) {
		color: white;
		font-weight: bold;
		background-color: darkblue;
		padding-left: 1.5em;
		padding-right: 1.5em;
	}
	
	:global(table.data9 summary) {
		font-style: italic;
	}
	
	:global(table.data9 tr.even) {
		background-color: rgb(231, 228, 249);
	}
	
	:global(table.data9 tr.odd) {
		background-color: white;
	}
	
	img.flag {
		max-height: 1em;
	}

    :global(table.data9 > caption) {
        font-weight: bold;
        padding-bottom: 0.2em;
    }

    :global(table.data9.sub > caption > span >span.cpt-r) {
        padding: 0.2em 0.5em;
        border: 0.1em dashed darkblue;
        border-radius: 0.4em;
    }
</style>