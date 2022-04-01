<template>
    <div>
        <h1 class="h2">Lists</h1>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab">Home</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab">Profile</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab">Contact</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home">
                <div class="card">
                    <div class="card-body">
                        ass
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="profile">...</div>
            <div class="tab-pane fade" id="contact">...</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Lists extends Vue {
    
}
</script>

<style scoped>
    .tab-pane > .card {
        border-top: 0px;
    }
</style>
