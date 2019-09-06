<template>
    <v-navigation-drawer v-model='drawer' :mini-variant.sync="mini" mini-variant-width="90" app dark class="">
        <v-list>
            <v-list-item-group>
                <v-list-item>
                    <v-list-item-title class="title"><p class="font-weight-light">Adsplus</p></v-list-item-title>
                    <v-btn icon @click.stop="mini = !mini">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </v-list-item>
                <v-divider />
                <v-list-item mobile-break-point="991">
                <v-list-item-icon>
                    <i class="material-icons">dashboard</i>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text font-weight-light">Dashboard</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    data(){
        return{
            drawer: true,
            mini: true
        }
    },
    watch: {
        // 'window.location.href'(){
        //     console.log(this.$router.currentRoute);
        //     if (this.$router.currentRoute == 'http://localhost:8080/login'){
        //         this.drawer = false;
        //     }
        //     else {
        //         this.drawer = true;
        //     }
        // }
    }
}
</script>
<style>

</style>