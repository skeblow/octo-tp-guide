<template>
    <div>
        <h1>Home</h1>

        <div class="row">
            <div class="col-4 mb-4" v-for="(achivementList, type) of achievements" v-bind:key="type">
                <div class="card">
                    <div class="card-header">{{ type }}</div>
                    <div class="card-body">
                        <table class="table table-stripped table-hover">
                            <tbody>
                                <tr v-for="achievement of achivementList" v-bind:key="achievement.id">
                                    <td>{{ achievement.name }}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Achievement } from '../../../shared';
import DailyService from '../services/DailyService';

@Options({
    components: {
    },
})
export default class Home extends Vue {
    achievements: {[key: string]: Array<Achievement>} = {};

    public mounted(): void {
        DailyService.getDailyAchievements()
            .then(achievements => {
                this.achievements = achievements;
                console.log(achievements);
            });
    }
}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}

.main {
    width: 200px;
}
</style>
