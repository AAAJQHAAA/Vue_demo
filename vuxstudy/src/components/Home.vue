<template>
  <div id="home">
    <!--头部导航-->
    <x-header :left-options="{showBack: false}">{{$t('home.headerTitle')}}</x-header>
    <group>
      <popup-picker :title="$t('home.popuptitle1')" :data="langs" v-model="langvalue" @on-hide="hide"></popup-picker>
      <popup-picker :title="$t('home.popuptitle2')" :data="machines" v-model="machinevalue"></popup-picker>
    </group>
    <x-button type="primary" link="/updates">{{$t('home.buttonValue')}}</x-button>
  </div>
</template>

<script>
  import { XButton,Actionsheet,XHeader,Group,PopupPicker} from 'vux'
  export default {
    name: "Home",
    components:{
      XButton,
      Actionsheet,
      XHeader,
      Group,
      PopupPicker
    },
    data () {
      return {
        langvalue:this.$t('home.langvalue'),
        machinevalue:this.$t('home.machinevalue')
      }
    },
    methods: {
      hide(){
        let lang=this.langvalue[0]
        switch (lang) {
          case '中文':
          case 'Chinese':
            this.$i18n.locale = 'zh-CN'
            break
          case '英语':
          case 'English':
            this.$i18n.locale = 'en-US'
            break
        }
      }
    },
    computed:{
      langs(){
        this.langvalue=this.$t('home.langvalue')
        return this.$t('home.langs')
      },
      machines(){
        this.machinevalue=this.$t('home.machinevalue')
        return this.$t('home.machines')
      }
    }
  }
</script>

<style scoped>

</style>
