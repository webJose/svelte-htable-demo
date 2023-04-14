<script lang="ts">
	import Htable, {type Column } from "svelte-htable";
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
<Htable class="data1" {columns} {items} />

<style>
	:global(table.data1) {
		border: 0.2em solid darkblue;
	}
	:global(table.data1 th) {
		color: white;
		font-weight: bold;
		background-color: darkblue;
		padding-left: 1.5em;
		padding-right: 1.5em;
	}
</style>