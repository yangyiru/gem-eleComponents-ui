<template>
    <div id="app">
        <!-- <el-button @click="isOpen = true">test buttom</el-button> -->
        <!-- <GemModal title="ceshi" :value="isOpen"></GemModal> -->
        <!-- <router-view /> -->
        <div class="container" v-if="!isIndex">
            <sideNav  class="nav"/>
            <router-view class="view"></router-view>
        </div>
        <router-view class="page" v-else></router-view>
    </div>
</template>
<script>
import sideNav from './components/slideNav';
export default {
    data() {
        return {
            isOpen: false,
            isIndex: true
        };
    },
    components: {
        sideNav,
    },
    watch: {
        $route() {
            this.isIndex = this.$route.name === 'index';
        },
    },
};
</script>
<style lang="scss">
@import './assets/css/index';

.container {
    margin: 48px auto;
    width: 90%;
    background-color: #fff;
    box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
    .nav {
        float: left;
        width: 210px;
    }
    .view {
        float: left;
        width: calc('100% - 215px');
        padding: 32px 48px 48px;
        box-sizing: border-box;
    }
}

.container:after {
    content: '';
    clear: both;
    display: block;
}
</style>
