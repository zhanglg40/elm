<template>
  <div class="food_container">
  <head-top  head-title="年度电力数据查询" goBack="true"></head-top>

    <SbbList  @transferSbbId="getSbbID"></SbbList>
    <div id="app">

      <date-picker field="myDate"
                   placeholder="年份"
                   v-model="dateFrom"
                   format="yyyy"
                   :backward="true"
                   :no-today="false"
                   :forward="false"></date-picker>

    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    <div class="sort_container1">

      <div class="login_container" @click="search" >查询</div>
    </div>

    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import headTop from 'src/components/header/head'
  import SbbList from 'src/components/common/SbbList'
  import footGuide from 'src/components/footer/footGuide'
  import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'; //引入对应的组件
  import alertTip from 'src/components/common/alertTip'
    export default {
      data(){
        return {
      headTitle: '', // msiet页面头部标题
      foodTitle: '', // 排序左侧头部标题
      sbbId:'',
          dateFrom: '',
          dateTo: '',
          showAlert: false,
          alertText: null,
        }
      },
      components: {
        headTop,
        alertTip,
        footGuide,
        SbbList,
        'date-picker': myDatepicker
      },
      methods: {
        getSbbID(msg){
          this.sbbId=msg
        },
        closeTip(){
          this.showAlert = false;
        },

        search(){

          if(this.sbbId==""){
            this.showAlert = true;
            this.alertText = '请选择设备';
            return;
          }
          this.$router.push({ path: '/yearData' ,query:{sbbId:this.sbbId,dateFrom:this.dateFrom,dateTo:this.dateTo}})
        }
      },
      mounted () {

        this.dateFrom=getCurrentTime()
      }
    }
  function getCurrentTime(){
    var date = new Date();
    var year = date.getFullYear();

    var month = date.getMonth() ;
    month++;
    var m=month< 10 ? "0" + month:month;

    return year ;
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .food_container{
    padding-top: 5rem;
  }
  .sort_container{
    background-color: #fff;
    border-bottom: 0.035rem solid #f1f1f1;
    position: fixed;
    top: 3.25rem;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 13;
    box-sizing: border-box;
  .sort_item{
  @include sc(0.55rem, #444);
  @include wh(100%, 1.6rem);
    text-align: center;
    line-height: 1rem;
  .sort_item_container{
  @include wh(100%, 100%);
    position: relative;
    z-index: 14;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: .3rem;
  .sort_item_border{
    height: 1rem;
    border-right: 0.025rem solid $bc;
  }
  }
  .sort_icon{
    vertical-align: middle;
    transition: all .3s;
    fill:#666;
  }

  }
  .choose_type{
  .sort_item_container{

  .category_title{
    color: $blue;
  }
  .sort_icon{
    transform: rotate(180deg);
    fill:$blue;
  }
  }
  }
  .showlist-enter-active, .showlist-leave-active {
    transition: all .3s;
    transform: translateY(0);
  }
  .showlist-enter, .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .sort_detail_type{
    width: 100%;
    position: absolute;
    display:flex;
    top: 1.6rem;
    left: 0;
    border-top: 0.025rem solid $bc;
    background-color: #fff;
  }
  .category_container{
  .category_left{
    flex: 1;
    background-color: #f1f1f1;
    height: 16rem;
    overflow-y: auto;
  span{
  @include sc(0.5rem, #666);
    line-height: 1.8rem;
  }
  .category_left_li{
  @include fj;
    padding:0 0.5rem;
  .category_icon{
  @include wh(.8rem, .8rem);
    vertical-align: middle;
    margin-right: .2rem;
  }
  .category_count{
    background-color: #ccc;
  @include sc(.4rem, #fff);
    padding: 0 .1rem;
    border: 0.025rem solid #ccc;
    border-radius: 0.8rem;
    vertical-align: middle;
    margin-right: 0.25rem;
  }
  .category_arrow{
    vertical-align: middle;
  }
  }
  .category_active{
    background-color: #fff;
  }
  }
  .category_right{
    flex: 1;
    background-color: #fff;
    padding-left: 0.5rem;
    height: 16rem;
    overflow-y: auto;
  .category_right_li{
  @include fj;
    height: 1.8rem;
    line-height: 1.8rem;
    padding-right: 0.5rem;
    border-bottom: 0.025rem solid $bc;
  span{
    color: #666;
  }
  }
  .category_right_choosed{
  span{
    color: $blue;
  }
  }
  }
  }
  .sort_list_container{
    width: 100%;
  .sort_list_li{
    height: 2.5rem;
    display: flex;
    align-items: center;
  svg{
  @include wh(0.7rem, 0.7rem);
    margin:0 .3rem 0 .8rem;
  }
  p{
    line-height: 2.5rem;
    flex: auto;
    text-align: left;
    text-indent: 0.25rem;
    border-bottom: 0.025rem solid $bc;
  @include fj;
    align-items: center;
  span{
    color: #666;
  }
  }
  .sort_select{
  span{
    color: $blue;
  }
  }
  }
  }
  .filter_container{
    flex-direction: column;
    align-items: flex-start;
    min-height: 10.6rem;
    background-color: #f1f1f1;
  .filter_header_style{
  @include sc(0.4rem, #333);
    line-height: 1.5rem;
    height: 1.5rem;
    text-align: left;
    padding-left: .5rem;
    background-color: #fff;
  }
  .filter_ul{
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.5rem;
    background-color: #fff;
  .filter_li{
    display: flex;
    align-items: center;
    border: 0.025rem solid #eee;
  @include wh(4.7rem, 1.4rem);
    margin-right: 0.25rem;
    border-radius: 0.125rem;
    padding: 0 0.25rem;
    margin-bottom: 0.25rem;
  svg{
  @include wh(.8rem, .8rem);
    margin-right: 0.125rem;
  }
  span{
  @include sc(0.4rem, #333);
  }
  .filter_icon{
  @include wh(.8rem, .8rem);
    font-size: 0.5rem;
    border: 0.025rem solid $bc;
    border-radius: 0.15rem;
    margin-right: 0.25rem;
    line-height: .8rem;
    text-align: center;
  }
  .activity_svg{
    margin-right: .25rem;
  }
  .selected_filter{
    color: $blue;
  }
  }
  }
  .confirm_filter{
    display: flex;
    background-color: #f1f1f1;
    width: 100%;
    padding: .3rem .2rem;
  .filter_button_style{
  @include wh(50%, 1.8rem);
    font-size: 0.8rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
  }
  .clear_all{
    background-color: #fff;
    margin-right: .5rem;
    border: 0.025rem solid #fff;
  }
  .confirm_select{
    background-color: #56d176;
    color: #fff;
    border: 0.025rem solid #56d176;
  span{
    color: #fff;
  }
  }
  }
  }
  }
  .showcover-enter-active, .showcover-leave-active {
    transition: opacity .3s
  }
  .showcover-enter, .showcover-leave-active {
    opacity: 0
  }
  .back_cover{
    position: fixed;
  @include wh(100%, 100%);
    z-index: 10;
    background-color: rgba(0,0,0,0.3);
  }
  .login_container{
    margin: 0 .5rem 1rem;
  @include sc(.7rem, #fff);
    background-color:	#63B8FF;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }
  .sort_container1 {
    background-color: #fff;
    margin-top:.95rem;
    border-bottom: 0.025rem solid #f1f1f1;
    top: 6.95rem;
    z-index: 5;
  }
</style>
