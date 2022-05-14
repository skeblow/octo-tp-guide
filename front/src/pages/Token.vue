<template>
    <div>
        <div class="row">
            <div class="col-9">
                <div class="mb-3">
                    <label for="tokenInput" class="form-label">Token</label>
                    <input type="text" class="form-control" id="tokenInput" v-model="token">
                </div>

                <button class="btn btn-primary" @click="save()">Save</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TokenService from '../services/TokenService';

@Options({})
export default class Token extends Vue {
    token: string = '';

    public save(): void {
        TokenService.saveToken(this.token);
    }

    mounted(): void {
        this.token = TokenService.getToken();
    }
}
</script>

<style scoped>

</style>