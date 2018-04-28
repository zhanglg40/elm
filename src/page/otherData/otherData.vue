<template>
  <div class="page-loadmore">

    <head-top head-title="数据列表" go-back='true'>  </head-top>


    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore  @translate-change="translateChange" @top-status-change="handleTopChange"       :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">


        <ul class="page-loadmore-list">
          <li v-for="item in list" class="page-loadmore-listitem">

             <table>
               <tr><td>设备名称：</td><td>{{ item.sbbName }}</td></tr>
               <tr><td>数值：</td><td>{{ item.monitoringData }}</td></tr>
               <tr><td>采集类型：</td><td>{{ item.monitoringType }}</td></tr>
               <tr><td>采集区域：</td><td>{{ item.areaName }}</td></tr>
               <tr><td>采集时间：</td><td>{{ item.createDate }}</td></tr>
            </table>
            </li>
        </ul>



        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>

        <foot-guide></foot-guide>
<!--        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>-->
      </mt-loadmore>




    </div>
  </div>
</template>

<style>



  .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }
  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
  }

  .mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle;

  }

  .page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
  }

  .page-loadmore-desc:last-of-type,
  .page-loadmore-listitem {
    border-bottom: 1px solid #eee
  }

  .page-loadmore-listitem {
    height: 10em;
    line-height: 1.5em;
    font-size: 0.3rem;
  /*  text-align: center*/
  }

  .page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
  }

  .page-loadmore-wrapper {
    overflow: scroll
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

</style>

<script type="text/babel">
  import headTop from 'src/components/header/head2'
  import footGuide from 'src/components/footer/footGuide'
  import {otherDa } from 'src/service/getData'
  export default {
    data() {
      return {
        list: [],
        allLoaded: false,

        dateTo:'', //
        dateFrom: '', //
        sbbId:'', // 设备id
        sbbType:'', // 设备类型
        bottomStatus: '',
        wrapperHeight: 0,
        pageSize:10,
        pageNo:1,

        bottomStatus: '',
        wrapperHeight: 0,



        topStatus: '',
        //wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0



      };

    },
    components:{
      footGuide,
      headTop
    },
    methods: {
      handleBottomChange(status) {
     //   alert(status);
        this.bottomStatus = status;
      },

      loadBottom() {
     //   setTimeout(() => {
          //let lastValue = this.list[this.list.length - 1];
          this.pageNo++;
          let pageNo=this.pageNo;
          let pageSize=this.pageSize;
/*          this.sbbId = this.$route.query.sbbId;
        this.dateFrom = this.$route.query.dateFrom;
        this.dateTo = this.$route.query.dateTo;*/
            otherDa(this.sbbId,this.dateFrom,this.dateTo ,this.pageNo,this.pageSize,sessionStorage.userid).then(res => {

          this.placelist = res ;
              for(var i=0;i<this.placelist.length;i++){
                this.list.push(this.placelist[i]);

              }
            if( this.placelist.length<10)
              return;
        //  })
          /*if (lastValue < 40) {
            for (let i = 1; i <= 10; i++) {
              this.list.push(lastValue + i);
            }
          } else {
            this.allLoaded = true;
          }*/
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },








      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {
        setTimeout(() => {
          let firstValue = this.list[0];
          for (let i = 1; i <= 10; i++) {
            this.list.unshift(firstValue - i);
          }
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },

    },




    created() {
     /* for (let i = 1; i <= 20; i++) {
        this.list.push(i);
      }*/
      this.sbbId = this.$route.query.sbbId;
      this.dateFrom = this.$route.query.dateFrom;
      this.dateTo = this.$route.query.dateTo;
      otherDa(this.sbbId,this.dateFrom,this.dateTo ,this.pageNo,this.pageSize,sessionStorage.userid).then(res => {
        this.placelist = res ;

        for(var i=0;i<this.placelist.length;i++){
          this.list.push(this.placelist[i]);

        }
      })
    },

    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  };
</script>
