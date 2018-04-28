<template>
  <section class="sort_container">
    <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
      <div class="sort_item_container" @click="chooseType('sort')">
        <div class="sort_item_border">
          <span :class="{category_title: sortBy == 'sort'}">{{sbbTitle}}</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
      </div>
      <transition name="showlist">
        <section v-show="sortBy == 'sort'" class="sort_detail_type">
          <ul class="sort_list_container" @click="sortList($event)" v-if="devicelist.length">
            <li class="sort_list_li" v-for="item in devicelist">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
              </svg>
              <p v-bind:data="item.sbbId" :class="{sort_select: sbbId == item.sbbId}">
                <span> {{item.sbbName}}</span>
                <svg v-if="sbbId == item.sbbId">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                </svg>
              </p>
            </li>

          </ul>
        </section>
      </transition>

    </div>
  </section>
</template>

<script>
  import {deviceList} from 'src/service/getData'
    export default {

      data(){
        return {
          sbbId:"1",
          devicelist:[],
          sbbTitle:"设备列表",
          sortByType: null, // 根据何种方式排序
          sortBy: '', // 筛选的条件
        }
      },
      //props:['sbbId'],
      methods: {
        // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
        async chooseType(type){
          if (this.sortBy !== type) {
            this.sortBy = type;
            //food选项中头部标题发生改变，需要特殊处理

              //将foodTitle 和 headTitle 进行同步
              this.foodTitle = this.headTitle;

          }else{
            //再次点击相同选项时收回列表
            this.sortBy = '';

          }
        },
        //点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
        sortList(event){

          let node;
          // 如果点击的是 span 中的文字，则需要获取到 span 的父标签 p
          if (event.target.nodeName.toUpperCase() !== 'P') {
            node = event.target.parentNode;
          } else {
            node = event.target;
          }
          this.sbbId = node.getAttribute('data');
          this.sbbTitle=node.innerText;
          this.$emit('transferSbbId', this.sbbId);
          this.sortBy = '';
        },
      },
      mounted(){

        deviceList(sessionStorage.userid).then(res => {
          this.devicelist = res ;
          this.sbbId = res[0].sbbId;
          this.sbbTitle = res[0].sbbName;
          this.$emit('transferSbbId', this.sbbId);
        })
      }
    }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .food_container{
    padding-top: 3.6rem;
  }
  .sort_container{
    background-color: #fff;
    border-bottom: 0.035rem solid #f1f1f1;
    position: fixed;
    top: 3.25rem;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 93;
    box-sizing: border-box;
  .sort_item{
  @include sc(0.95rem, #444);
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


</style>
