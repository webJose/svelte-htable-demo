import { type Item } from "svelte-htable";

export interface DataItem extends Item {
    first_name: string;
    last_name: string;
    birth_date: string;
    manager_id: number;
    gender: string;
}