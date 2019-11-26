import Vue from 'vue'
import Vuex from 'vuex'
//1.安装插件
Vue.use(Vuex)
//2.创建对象
const store=new Vuex.Store({
	state:{//存放全局变量，通过$store.state调用
		counter:0,
		students:[
			{id:1,name:'jack',age:10},
			{id:2,name:'jack1',age:15},
			{id:3,name:'jack2',age:20},
			{id:4,name:'jack3',age:30},
			{id:5,name:'jack4',age:25}
		],
		info:{
			id:'111',
			name:'pipipi',
			age:'1112'
		}
	},
	mutations:{//全局方法(默认参数state)，通过$store.commit('increment')调用
		increment(state){
			state.counter++
		},
		decrememt(state){
			state.counter--
		},
		count(state,num){//传入参数
			state.counter+=num
		},
		addstu(state,stu){
			state.students.push(stu)
		},
		addobj(state,obj){//这是另一种传参方式
			console.log(obj)
		},
		updatainfo(state){//异步操作必须使用action调用
			state.info.name='瓜皮'
			//如果这儿加一个定时，在mutation中进行异步操作devtools会有问题
			// setTimeout(()=>{
			// 	state.info.name='瓜皮'
			// },1000)
		}
	},
	actions:{
		updataBytime(context,num){//异步操作方法，调用mutation//this.$store.dispatch('updataBytime')调用action
			setTimeout(()=>{
				context.commit('updatainfo')
				console.log("action传参："+num.message)
				num.success()
			},1000)
		}
	},
	getters:{//类似计算属性（默认参数state），通过$store.getters.powercounter调用
		powercounter(state){
			return state.counter*state.counter
		},
		more20stu(state){
			return state.students.filter( s =>{return s.age>20})
		},
		more20stulength(state,getters){
			return getters.more20stu.length
		},
		moreagestu(state){//getters中传参
			return function(age){
				return state.students.filter( s =>{return s.age>age})
			}
		}
	},
	modules:{
		a:{
			state:{
				name:'张三'
			},
			mutations:{//不能和上面重复名字，调用this.$store.commit('updataname')
				updataname(state){
					state.name='lisi'
				}
			},
			getters:{
				fullname(state,getters,rootstate){//可以获取state，getters，根state
					
				}
			}
		}
	}
})

//3.导出
export default store