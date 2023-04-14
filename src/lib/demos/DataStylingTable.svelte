<script lang="ts">
	import Htable, { type Column } from "svelte-htable";
    import type { DataItem } from "../../data";
	
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
</script>
<div class="controls">
</div>
<Htable class="data3" {columns} {items}>
	<svelte:fragment slot="summary" let:item>
		<img
				 class="flag"
				 src="https://flagcdn.com/{item.country_code.toLowerCase()}.svg"
				 alt={item.country_code}
				 />&nbsp;{item.last_name},&nbsp;{item.first_name}
	</svelte:fragment>
</Htable>

<style>
	:global(table.data3) {
		border: 0.2em solid darkblue;
	}
	
	:global(table.data3 th) {
		color: white;
		font-weight: bold;
		background-color: darkblue;
		padding-left: 1.5em;
		padding-right: 1.5em;
	}
	
	:global(table.data3 summary) {
		font-style: italic;
	}
	
	:global(table.data3 tr.even) {
		background-color: rgb(231, 228, 249);
	}
	
	:global(table.data3 tr.odd) {
		background-color: white;
	}
	
	:global(table.data3 tr:not(.sub) > td:first-child) {
		background-color: rgb(39, 26, 118);
		color: white;
	}
	
	img.flag {
		max-height: 1em;
	}
</style>