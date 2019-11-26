<template>
  <div>
    <x-header class="header" @on-click-back="backtoHome" :left-options="{backText: '首页',preventGoBack:true}">配置页面</x-header>
    <scroll>
      <!--配置流程-->
      <flow ref="flow">
        <flow-state state="1" title="时间配置" is-done></flow-state>
        <flow-line :is-done="firstline"></flow-line>

        <flow-state state="2" :is-done="secondstate" title="逆变器配置"></flow-state>
        <flow-line :is-done="secondline"></flow-line>

        <flow-state state="3" :is-done="thirdstate" title="系统配置"></flow-state>
        <flow-line :is-done="thirdline"></flow-line>

        <flow-state state="4" :is-done="fourstate" title="格子配置"></flow-state>
      </flow>
      <!--下一步和上一步按钮-->
      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="back">上一步</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="next">下一步</x-button>
        </flexbox-item>
      </flexbox>
      <!--第一步时间选择-->
      <group title="时间选择" v-show="currentstart===1">
        <datetime title="时间" v-model="time" format="YYYY-MM-DD HH:mm"></datetime>
      </group>
      <!--第二步逆变器设置-->
      <group title="逆变器设置" v-show="currentstart===2">
        <popup-picker title="逆变器设置" :data="inverters" v-model="inverter"></popup-picker>
      </group>
      <!--第三步不同的逆变器有不同的系统配置-->
      <group title="后缀HV的系统配置" v-show="currentstart===3">
        <x-input title="Model Serious" required :value="modelSerious" text-align="right" placeholder="please input" :is-type="inrange" :max="1"></x-input>
        <popup-picker title="Cell Type" :data="cellTypes" v-model="cellType"></popup-picker>
      </group>
      <group title="后缀LV的系统配置" v-show="currentstart===3">
        <x-input title="Parallels" required :value="Parallels" text-align="right" placeholder="please input" :is-type="inrange46" :max="2"></x-input>
        <popup-picker title="BMS Type" :data="bmsTypes" v-model="bmsType"></popup-picker>
      </group>
      <!--第四步格子设置-->
      <group title="格子设置" v-show="currentstart===4">
        <popup-picker title="Grid" :data="grids" v-model="grid"></popup-picker>
        <popup-picker title="Phase" :data="phases" v-model="phase"></popup-picker>
      </group>
      <!--提交配置-->
      <group title="提交配置" v-show="currentstart===4">
        <x-button type="primary">提交</x-button>
      </group>
    </scroll>
  </div>
</template>

<script>
  import { XButton,XHeader,Flow, FlowState, FlowLine,Group,Flexbox,FlexboxItem,Datetime,PopupPicker,XInput} from 'vux'
  import Scroll from '../common/scroll/Scroll'
    export default {
        name: "Config",
      components:{
        XButton,XHeader,Scroll,Flow, FlowState, FlowLine,Group,Flexbox,FlexboxItem,Datetime,PopupPicker,XInput
      },
      data(){
        return {
          currentstart:1,
          firstline:false,
          secondstate:false,
          secondline:false,
          thirdstate:false,
          thirdline:false,
          fourstate:false,
          time:'',
          inverters:[['Fronius HV','KOSTAL HV','SMA HV','GOODWE HV','SMA LV','SUNTECH LV','Victron LV','Selectron LV']],
          inverter:[],
          modelSerious:'',
          inrange:function (value) {
            return {
              valid: parseInt(value)>=4&&parseInt(value)<=8,
              msg: '必须>=4、<=8'
            }
          },
          cellTypes: [['Premium HVS','Premium HVM','Premium HVH']],
          cellType: [],
          Parallels:'',
          inrange46:function (value) {
            return {
              valid: parseInt(value)<=46,
              msg: '必须<=46'
            }
          },
          bmsTypes:[['Premium LVH','Premium LVL']],
          bmsType:[],
          grids: [['On-grid','Off-grid','On-grid backup']],
          grid: ['On-grid'],
          phases: [['1','3']],
          phase: []
        }
      },
      methods:{
        backtoHome(){
          this.$router.push('/')
        },
        back(){
          switch (this.currentstart) {
            case 1:
              break;
            case 2:
              this.firstline=false
              this.secondstate=false
              this.currentstart--
              break;
            case 3:
              this.secondline=false
              this.thirdstate=false
              this.currentstart--
              break;
            case 4:
              this.thirdline=false
              this.fourstate=false
              this.currentstart--
              break;
          }
        },
        next(){
          switch (this.currentstart) {
            case 1:
              this.firstline=true
              this.secondstate=true
              this.currentstart++
              break;
            case 2:
              this.secondline=true
              this.thirdstate=true
              this.currentstart++
              break;
            case 3:
              this.thirdline=true
              this.fourstate=true
              this.currentstart++
              break;
            case 4:
              break;
          }
        }
      }
    }
</script>

<style scoped>
  .header{
    position: fixed;
    width: 100%;
    z-index: 1;
  }
</style>
