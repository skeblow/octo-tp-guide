<template>
    <div>
        <h1>Items</h1>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.name">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ItemService from '../services/ItemService';

@Options({})
export default class Items extends Vue {
    items: Array<any> = []; 

    mounted() {
        ItemService.getAll()
            .then(items => this.items = items);
    }
}
</script>

<style scoped>

</style>
