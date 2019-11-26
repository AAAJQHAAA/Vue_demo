<template>
  <div id="app">
		<router-view></router-view>
    <tabbar>
      <tabbar-item link="/updates">
        <img slot="icon" src="./assets/img/tabbar/firmware1.png">
        <span slot="label">固件更新</span>
      </tabbar-item>
      <tabbar-item link="/preset">
        <img slot="icon" src="./assets/img/tabbar/configuration1.png">
        <span slot="label">预置参数</span>
      </tabbar-item>
      <tabbar-item link="/config">
        <img slot="icon" src="./assets/img/tabbar/threshold1.png">
        <span slot="label">基础配置</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'App',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
