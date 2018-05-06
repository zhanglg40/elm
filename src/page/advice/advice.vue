<template>
  <div class="rating_page">
    <head-top head-title="安检建议" go-back='true'>  </head-top>
    <section class="hot_questions" >
      <ul>
        <h4 class="qustion_header">危害分类</h4>
        <li v-for="(item, index) in questionTitle" :key="index" class="question_title" @click="toQuestionDetail(item, index)">
          <span>{{item}}</span>
          <svg class="arrow-svg" fill="#999">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </li>
      </ul>
    </section>
    <section class="hot_questions" >
      <ul>
        <h4 class="qustion_header">排查方法</h4>
        <li v-for="(item, index) in questionTitle1" :key="index" class="question_title" @click="toQuestionDetail1(item, index)">
          <span>{{item}}</span>
          <svg class="arrow-svg" fill="#999">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </li>
      </ul>
    </section>
    </div >
</template>

<script>
  import headTop from 'src/components/header/head'
  import {getService} from 'src/service/getData'
  import {mapMutations} from 'vuex'
  import alertTip from 'src/components/common/alertTip'
  export default {
    data(){
      return{
        serviceData: null, //服务信息
        questionTitle: ["电路漏电的危害","电流超标与温度超标的危害"], //问题标题
        questionTitle1: ["漏电的排查方法","电流超标与温度超标的排查方法"], //问题标题
        questionDetail: ["ldwh","dlwh"], //问题详情
        questionDetail1: ["ldpc","dlpc"],
      }
    },
    components: {
      headTop,
      alertTip
    },
    methods: {
      toQuestionDetail(title, index){

        this.$router.push('/'+this.questionDetail[index]);
      },
      toQuestionDetail1(title, index){

        this.$router.push('/'+this.questionDetail1[index]);
      }
    },
    mounted(){
      this.initData();
    }
    }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .rating_page{
    background-color: #fff;
    padding-top: 1.95rem;
  p, span{
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  }
  .hot_questions{
  padding-top:  1rem;
  .qustion_header{

  @include sc(.75rem, #333);
    color:#7D9EC0;
    font-weight:bold;
    text-align: center;
    line-height: 2rem;
    border-bottom: 1px solid #f5f5f5;
    padding-left: .7rem;
  }
  .question_title{
    background-color:	#EDEDED;
    padding: 0 .7rem;
    line-height: 2rem;
    border-bottom: 1px solid #f5f5f5;
  @include fj;
    align-items: center;
  span{
  @include sc(.6rem, #666);
  }
  svg{
  @include wh(.6rem, .6rem);
  }
  }
  }
</style>
