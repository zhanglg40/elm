<template>
  <div class="profile_page">
    <head-top head-title="统计列表" ></head-top>
    <section>
      <section class="profile-number">
        <div class="profile-link">
          <div class="user-info">
            <p>电力统计列表</p>

          </div>

        </div>
      </section>
      <section class="info-data">
        <ul class="clear">
              <router-link to="/srhYear" tag="li" class="info-data-link">
                <span class="info-data-top"><b>年统计</b> </span>
                 <span class="info-data-bottom"></span>
             </router-link>
             <router-link to="/srhMonth" tag="li" class="info-data-link">
                 <span class="info-data-top"><b>月统计</b></span>
                 <span class="info-data-bottom"></span>
             </router-link>
             <router-link to="/srhDay" tag="li" class="info-data-link">
                 <span class="info-data-top"><b>日统计</b></span>
                 <span class="info-data-bottom"></span>
             </router-link>
        </ul>
      </section>

      <section class="profile-1reTe">
        <router-link to='/srhReal' class="myorder">
          <aside>
            <svg fill="#4aa5f0">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
            </svg>
          </aside>
          <div class="myorder-div">
            <span>实时数据</span>
            <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
          </div>
        </router-link>

      </section>
    </section>
      <section class="profile-number">
        <div class="profile-link-rd">
          <div class="user-info">
            <p>其他设备统计列表</p>

          </div>

        </div>
      </section>
    <foot-guide></foot-guide>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import {mapState, mapMutations} from 'vuex'
  import {imgBaseUrl} from 'src/config/env'
  import {getImgPath} from 'src/components/common/mixin'

  export default {
    data(){
      return{

        profiletitle: '我的',
        username: sessionStorage.username,           //用户名
        resetname: '',
        mobile: '暂无绑定手机号',             //电话号码
        balance: 0,            //我的余额
        count : 0,             //优惠券个数
        pointNumber : 0,       //积分数
        avatar: '',             //头像地址
        imgBaseUrl,
      }
    },
    mounted(){
      this.initData();
    },
    mixins: [getImgPath],
    components:{
      headTop,
      footGuide,
    },

    computed:{
      ...mapState([
        'userInfo',
      ]),

    },

    methods:{

      ...mapMutations([
        'SAVE_AVANDER'
      ]),
      initData(){

      },
    },
    watch: {
      userInfo: function (value){
        debugger;
        this.initData()
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  .profile_page{
  p, span{
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  }
  .profile-number{
    padding-top:2.85rem;
  .profile-link{
    display:block;
    display:flex;
    box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background:$blue;
    padding: .666667rem .6rem;
  .privateImage{
    display:inline-block;
  @include wh(2.5rem,2.5rem);
    border-radius:50%;
    vertical-align:middle;
  .privateImage-svg{
    background:$fc;
    border-radius:50%;
  @include wh(2.5rem,2.5rem);
  }
  }
  .user-info{
    margin-left:.48rem;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
  p{
    font-weight:700;
  @include sc(.8rem,$fc);
  .user-icon{
  @include wh(0.5rem,0.75rem);
    display:inline-block;
    vertical-align:middle;
    line-height:0.75rem;
  .icon-mobile{
  @include wh(100%,100%);
  }
  }
  .icon-mobile-number{
    display:inline-block;
  @include sc(.57333rem,$fc);

  }
  }

  }
  .arrow{
  @include wh(.46667rem,.98rem);
    display:inline-block;
  svg{
  @include wh(100%,100%);
  }
  }
  }
  }
  .info-data{
    width:100%;
    background:$fc;
    box-sizing: border-box;
  ul{
  .info-data-link{
    float:left;
    width:33.33%;
    display:inline-block;
    border-right:1px solid #f1f1f1;
  span{
    display:block;
    width:100%;
    text-align:center;
  }
  .info-data-top{
  @include sc(.55rem,#333);
    padding: .853333rem 0 .453333rem;
  b{
    display:inline-block;
  @include sc(1.2rem,#f90);
    font-weight:700;
    line-height:1rem;
    font-family: Helvetica Neue,Tahoma;
  }
  }
  .info-data-bottom{
  @include sc(.57333rem,#666);
    font-weight:400;
    padding-bottom:.453333rem;

  }
  }
  .info-data-link:nth-of-type(2){
  .info-data-top{
  b{
    color:#ff5f3e;
  }
  }

  }
  .info-data-link:nth-of-type(3){
    border:0;
  .info-data-top{
  b{
    color:#6ac20b;
  }
  }
  }
  }
  }
  .profile-1reTe{
    margin-top:.4rem;
    background:$fc;
  .myorder{
    padding-left:1.6rem;
    display:flex;
    align-items: center;
  aside{
  @include wh(.7rem,.7rem);
    margin-left:-.866667rem;
    margin-right:.266667rem;
    display:flex;
    align-items: center;
  svg{
  @include wh(100%,100%);
  }
  }
  .myorder-div{
    width:100%;
    border-bottom:1px solid #f1f1f1;
    border-top: 1px solid #f1f1f1;
    padding:.433333rem .266667rem .433333rem 0;
  @include sc(.7rem,#333);
    display:flex;
    justify-content:space-between;
  span{
    display:block;
  }
  .myorder-divsvg{
  @include wh(.46667rem,.466667rem);
  svg{
  @include wh(100%,100%);
  }
  }
  }
  }
  .myorder:nth-of-type(3) .myorder-div{
    border:0;
  }
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .profile-link-rd {
    display: block;
    display: flex;
    box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #6699cc;
    padding: .666667rem .6rem;
  }
</style>
