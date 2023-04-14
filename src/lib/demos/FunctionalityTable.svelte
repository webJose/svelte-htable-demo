<script lang="ts">
	import Htable, { type Column } from "svelte-htable";
    import type { DataItem } from "../../data";
    import DemoControls from "$lib/DemoControls.svelte";
    import { scale } from "svelte/transition";

    type ToggleEventDetail = {
        item: DataItem,
        level: number,
        path: string,
        open: boolean
    };
	
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

    let initialLevelCount = 2;
    let nastyVisible = false;
    let nastyMsg = '';
    let skipToggles = true;
    setTimeout(() => {
        skipToggles = false;
    }, 2000);

    function popNastyMsg(e: CustomEvent<ToggleEventDetail>) {
        if (skipToggles) {
            return;
        }
        nastyMsg = prepareNastyMsg(e.detail.item, e.detail.open);
        nastyVisible = true;
    }

    function prepareNastyMsg(item: DataItem, isOpen: boolean) {
        const openMsgFactories = [
            {
                template: 'What are you doing?  Why are you checking {0} out?  Does {1} owe you 💶 or something?',
                data(): {[x: number]: any;} {
                    return {
                        0: item.first_name,
                        1: item.gender === 'Male' ? 'he' : 'she'
                    };
                }
            },
            {
                template: "Sooo... {0}, huh?  Do we like {1} now? 😲",
                data(): {[x: number]: any;} {
                    return {
                        0: item.first_name,
                        1: item.gender === 'Male' ? 'him' : 'her'
                    };
                }
            }
        ];
        const closeMsgFactories = [
            {
                template: 'Oh, now {0} is not good enough for ya.  Is that it? 😡',
                data(): {[x: number]: any;} {
                    return {
                        0: item.first_name
                    };
                }
            },
            {
                template: "That's what I thought.  You keep moving, pal. 🧐",
                data(): {[x: number]: any;} {
                    return { };
                }
            }
        ];
        const msgFactory = pickRandomMsg(isOpen ? openMsgFactories : closeMsgFactories);
        return process(msgFactory);

        function pickRandomMsg(msgFactories: typeof openMsgFactories) {
            return msgFactories[Math.floor(Math.random() * msgFactories.length)];
        }

        function process(template: typeof openMsgFactories[0]) {
            const replacements = template.data();
            return template.template.replace(/\{(\d+)\}/g, function(_ss, g1) {
                return replacements[g1];
            });
        }
    }
</script>

<DemoControls>
    <label>
        Initially show up to <input
            type="number"
            min="2"
            max="15"
            step="1"
            bind:value={initialLevelCount}
        />
        levels (<code>initialOpenLevel={initialLevelCount}</code>).
    </label>
</DemoControls>
{#if nastyVisible}
    <div class="nasty" transition:scale={{ duration: 500 }}>
        <p>{nastyMsg}</p>
    </div>
{/if}
<Htable
    class="data7"
    {columns}
    {items}
    nullText="(null)"
    initialOpenLevel={initialLevelCount}
    on:toggle={(e) => popNastyMsg(e)}
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
    :global(table.data7) {
        border: 0.2em solid darkblue;
    }

    :global(table.data7 th) {
        color: white;
        font-weight: bold;
        background-color: darkblue;
        padding-left: 1.5em;
        padding-right: 1.5em;
    }

    :global(table.data7 summary) {
        font-style: italic;
    }

    :global(table.data7 tr.even) {
        background-color: rgb(231, 228, 249);
    }

    :global(table.data7 tr.odd) {
        background-color: white;
    }

    img.flag {
        max-height: 1em;
    }

    div.nasty {
        border-radius: 0.5em;
        border: 0.15em solid rgb(191, 108, 255);
        padding: 1em 2em;
        text-align: center;
        background-color: rgb(229, 195, 255);
        margin-bottom: 1em;
        font-size: x-large;
    }
</style>
