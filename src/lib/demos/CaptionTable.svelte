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

    let limitPathSegments = false;
    let maxPathSegmentLength = 5;
    let reloadKey = 1;

    $: reloadKey = limitPathSegments || !limitPathSegments || maxPathSegmentLength ? reloadKey + 1 : reloadKey;
</script>
<DemoControls>
    <label>
        <input type="checkbox" bind:checked={limitPathSegments} />&nbsp;Limit path segments to:
    </label>
    <label>
        <input type="number" min="3" max="12" step="1" bind:value={maxPathSegmentLength} disabled={!limitPathSegments} /> characters.
    </label>
    <p>
        <strong>IMPORTANT:</strong>  Path segments are pre-calculated on component creation.  By the time the table is 
        shown, all path segments have already been calculated.  Therefore, changing things in the example controls will 
        force a table reload.
    </p>
    <p>
        Table reload is not super fast if you use the maximum sample size of 500 items, so be a little patient for the reloads.
    </p>
</DemoControls>
{#key reloadKey}
    <div transition:scale>
        <Htable
            class="data8"
            {columns}
            {items}
            nullText="(null)"
            level={l => `Level: ${l}`}
            showPath={true}
            captionOrder={CaptionOrder.LevelPath}
            pathSegment="last_name"
            pathSeparator=" > "
            maxPathSegmentLength={limitPathSegments ? maxPathSegmentLength : undefined}
        >
            <svelte:fragment slot="summary" let:item>
                <img
                        class="flag"
                        src="https://flagcdn.com/{item.country_code.toLowerCase()}.svg"
                        alt={item.country_code}
                        />&nbsp;{item.last_name},&nbsp;{item.first_name}
            </svelte:fragment>
        </Htable>
        </div>
{/key}

<style>
	:global(table.data8) {
		border: 0.2em solid darkblue;
	}
	
	:global(table.data8 th) {
		color: white;
		font-weight: bold;
		background-color: darkblue;
		padding-left: 1.5em;
		padding-right: 1.5em;
	}
	
	:global(table.data8 summary) {
		font-style: italic;
	}
	
	:global(table.data8 tr.even) {
		background-color: rgb(231, 228, 249);
	}
	
	:global(table.data8 tr.odd) {
		background-color: white;
	}
	
	img.flag {
		max-height: 1em;
	}
</style>