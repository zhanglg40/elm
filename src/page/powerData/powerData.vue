<template>
  <div class="city_container">

    <head-top head-title="数据列表" go-back='true'> ></head-top>
<!--    <form class="city_form" v-on:submit.prevent>
      <div>
        <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model='inputVaule'>
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style" @click='postpois' value="提交">
      </div>
    </form>-->
    <div class="as" v-if="placelist.length">
       <div class="menu_detail_list" v-for="item in placelist">
         <section class="menu_description">
           <!--<h3 class="list_description_head">

             {{item.sbbName}}
           </h3>
         <p class="food_description_sale_rating">
           <span >电度 ：{{item.electricalDegree}}</span>

           <span>漏电 ：{{item.leakageElectricity}}</span>
           <span> </span>
         </p>
           <p class="food_description_sale_rating">
             <span class="dy_style">电压A ：</span>
             <span> {{item.voltageA}}</span>
             <span  class="dy_style">电流A ：</span>
             <span> {{item.currentA}}</span>
           </p>
           <p class="food_description_sale_rating">
             <span>温度A ：</span>
             <span> {{item.temperatureA}}</span>

           </p>
           <p class="food_description_sale_rating">
           <span>时间 ：</span>
           <span> {{item.createDate}}</span>
           </p>-->
           <table class="list_description_head"><tr><!--<td colspan="2">设备名称：</td>--><td colspan="2" class="td_right">{{ item.sbbName }}</td>
           </tr><tr><td class="td_right">电度：</td><td>{{ item.electricalDegree }}</td><td class="td_right">漏电流：</td><td>{{ item.leakageElectricity }}</td></tr>
             <tr><td class="td_right">温度A：</td><td>{{item.temperatureA}}</td><td class="td_right">温度B：</td><td>{{item.temperatureB}}</td></tr>
             <tr><td class="td_right">温度C：</td><td>{{item.temperatureC}}</td><td class="td_right">温度N：</td><td>{{item.temperatureN}}</td></tr>
             <tr><td class="td_right">电压A：</td><td>{{ item.voltageA }}</td><td class="td_right">电压B：</td><td>{{ item.voltageB }}</td></tr>
             <tr><td class="td_right">电压C：</td><td>{{ item.voltageC }}</td><td class="td_right">电流A：</td><td>{{ item.currentA }}</td></tr>
             <tr><td class="td_right">电流B：</td><td>{{ item.currentB }}</td><td class="td_right">电流C：</td><td>{{ item.currentC }}</td></tr>
             <tr><td class="td_right">时间&nbsp;  ：</td><td colspan="3">{{ item.createDate }}</td></tr>
           </table>
         </section>

       </div>
    </div>
    <div class="search_none_place" v-else></div>
  </div>
</template>

<script>
  import headTop from 'src/components/header/head'
  import {powerDa, searchplace} from 'src/service/getData'
  import {getStore, setStore, removeStore} from 'src/config/mUtils'

  export default {
    data(){
      return{
        inputVaule:'', // 搜索地址
        sbbId:'', // 设备id
        dateTo:'', //
        placelist:[], // 搜索城市列表
        placeHistory:[], // 历史搜索记录
        dateFrom: '', //
        placeNone: false, // 搜索无结果，显示提示信息
      }
    },

    mounted(){
      this.sbbId = this.$route.query.sbbId;
      this.dateFrom = this.$route.query.dateFrom;
      this.dateTo = this.$route.query.dateTo;
       powerDa(this.sbbId,this.dateFrom,this.dateTo).then(res => {
         this.placelist = res ;
      })

    },

    components:{
      headTop
    },

    computed:{

    },

    methods:{
      initData(){
        //获取搜索历史记录
        if (getStore('placeHistory')) {
          this.placelist = JSON.parse(getStore('placeHistory'));
        }else{
          this.placelist = [];
        }
      },
      //发送搜索信息inputVaule
      postpois(){
        //输入值不为空时才发送信息
        if (this.inputVaule) {
          searchplace(this.sbbId, this.inputVaule).then(res => {
            this.dateFrom = false;
            this.placelist = res;
            this.placeNone = res.length? false : true;
          })
        }
      },
      /**
       * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
       * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
       */
      nextpage(index, geohash){
        let history = getStore('placeHistory');
        let choosePlace = this.placelist[index];
        if (history) {
          let checkrepeat = false;
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach(item => {
            if (item.geohash == geohash) {
              checkrepeat = true;
            }
          })
          if (!checkrepeat) {
            this.placeHistory.push(choosePlace)
          }
        }else {
          this.placeHistory.push(choosePlace)
        }
        setStore('placeHistory',this.placeHistory)
        this.$router.push({path:'/msite', query:{geohash}})
      },
      clearAll(){
        removeStore('placeHistory');
        this.initData();
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .city_container{
    padding-top: 3.55rem;
  }
  .change_city{
    right: 0.4rem;
  @include sc(0.6rem, #fff);
  @include ct;
  }
  .city_form{
    background-color: #fff;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-top: 0.4rem;
  div{
    width: 90%;
    margin: 0 auto;
    text-align: center;
  .input_style{
    border-radius: 0.1rem;
    margin-bottom: 0.4rem;
  @include wh(100%, 1.4rem);
  }
  .city_input{
    border: 1px solid $bc;
    padding: 0 0.3rem;
  @include sc(0.65rem, #333);
  }
  .city_submit{
    background-color: $blue;
  @include sc(0.65rem, #fff);
  }
  }
  }
  .pois_search_history{
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-left: 0.5rem;
  @include font(0.475rem, 0.8rem);
  }
  .getpois_ul{
    background-color: #fff;
    border-top: 1px solid $bc;
  li{
    margin: 0 auto;
    padding-top: 0.65rem;
    border-bottom: 1px solid $bc;
  .pois_name{
    margin: 0 auto 0.35rem;
    width: 90%;
  @include sc(0.65rem, #333);
  }
  .pois_address{
    width: 90%;
    margin: 0 auto 0.55rem;
  @include sc(0.45rem, #999);
  }
  }
  }
  .search_none_place{
    margin: 0 auto;
  @include font(0.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-indent: 0.5rem;
  }
  .clear_all_history{
  @include sc(0.7rem, #666);
    text-align: center;
    line-height: 2rem;
    background-color: #fff;
  }

  .menu_detail_list {
    background-color: #fff;
    padding: .6rem .4rem;
    border-bottom: 1px solid #f8f8f8;
    position: relative;
    overflow: hidden;
  .menu_detail_link {
    display: flex;
  .menu_description {
    width: 100%;


  .food_description_sale_rating{
    line-height: .7rem;

  }
  }
  }
  }


  .style_left{
    float:left;
    font-size:15px;
  }
  .style_right{
    float:right;
    font-size:15px;
  }
  .list_description_head {
    font-size: 0.5rem;
    width:80%;
    .td_right{
      text-align: right;
    }
   /* margin-bottom: .1rem;*/
  }
</style>
