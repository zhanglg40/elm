<template>

  <div>
    <head-top head-title="用电月趋势图" go-back='true'>  </head-top>



    <div >

      <div class="tabclass">

        <vchooser  :selections="periodList" @on-change="onParamChange('versions', $event)"></vchooser>

      </div>

    </div>

    <div >

      <div class="charts">
        <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
      </div>
      <div class="footcss">
      </div>
    </div>
    <foot-guide></foot-guide>
  </div>

</template>

<script>

  import vchooser from 'src/components/button/chooser'
  import VueHighcharts from 'vue2-highcharts'
  import headTop from 'src/components/header/head2'
  import footGuide from 'src/components/footer/footGuide'
  import {getMonthList} from 'src/service/getData'

  export default {
    data() {
      return{
        setIntervalNum:0,
        itemStatus:0,
        itemTitle:'温度A',
        itemType:this.$route.query.itemType,
        sbbId:'8160E2F6-6A06-4B26-9F86-B35BD4375338',
        placelist:[],
        sbbName:'',
        dateFrom:'',
        dateTo:'',
        periodList:[
          {
            label: '温度 ',
            value: 0
          },
          {
            label: '电流  ',
            value: 1
          },{
            label: '电压  ',
            value: 2
          },{
            label: '用电量  ',
            value: 3
          },{
            label: '漏电流',
            value: 4
          },{
            label: '有功功率',
            value: 5
          },{
            label: '功率因素',
            value: 6
          }
        ],
        ownerFreeData: [],
        options: {
          global: {
            useUTC: false
          },
          chart: {
            type: 'spline'
          },
          title: {
            text: '功率因素'
            //text: ' '
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: '功率因素(%)'
              //text: '  '
            },
            labels: {
              formatter: function () {
                return this.value;
              }
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: []

        }

      }
    },
    methods: {
      onParamChange (attr, val) {
        this.itemStatus = val.value;

        this.$refs.lineCharts.removeSeries();

        var title = '';
        let lineCharts = this.$refs.lineCharts;
        lineCharts.getChart().xAxis[0].setTitle({text:'时间'});
        if(this.itemStatus == 0){
          title = '温度';
          lineCharts.getChart().yAxis[0].setTitle({text:'温度(摄氏度)'});
          this.itemType="temperatureA";
          this.getYearTime(lineCharts,'温度A');
          this.itemType="temperatureB";
          this.getYearTime(lineCharts,'温度B');
          this.itemType="temperatureC";
          this.getYearTime(lineCharts,'温度C');
          this.itemType="temperatureN";
          this.getYearTime(lineCharts,'温度N');

        }else if(this.itemStatus == 1){
          title = '电流';
          lineCharts.getChart().yAxis[0].setTitle({text:'电流(安培)'});
          this.itemType="currentA";
          this.getYearTime(lineCharts,'电流A');
          this.itemType="currentB";
          this.getYearTime(lineCharts,'电流B');
          this.itemType="currentC";
          this.getYearTime(lineCharts,'电流C');
        }else if(this.itemStatus == 2){
          title = '电压';

          lineCharts.getChart().yAxis[0].setTitle({text:'电压(伏特)'});
          this.itemType="voltageA";
          this.getYearTime(lineCharts,'电压A');
          this.itemType="voltageB";
          this.getYearTime(lineCharts,'电压B');
          this.itemType="voltageC";
          this.getYearTime(lineCharts,'电压C');
        }else if(this.itemStatus == 3){
          title = '用电量';
          lineCharts.getChart().yAxis[0].setTitle({text:'用电量(度)'});
          this.itemType="electricalDegree";
          this.getYearTime(lineCharts,'用电量');
        }else if(this.itemStatus == 4){
          this.showlist=[];
          title = '漏电流';
          lineCharts.getChart().yAxis[0].setTitle({text:'漏电流(毫安培)'});
          this.itemType="leakageElectricity";
          this.getYearTime(lineCharts,'漏电流');
        }else if(this.itemStatus == 5){
          this.showlist=[];
          title = '有功功率';
          lineCharts.getChart().yAxis[0].setTitle({text:'有功功率(瓦)'});
          this.itemType="activePower";
          this.getYearTime(lineCharts,'有功功率');
        }else if(this.itemStatus == 6){
          this.showlist=[];
          title = '功率因数';
          lineCharts.getChart().yAxis[0].setTitle({text:'功率因数'});
          this.itemType="powerFactor";
          this.getYearTime(lineCharts,'功率因数');
        }

      },
      routerBack(){
        this.$router.go(-1);

        clearInterval(this.setIntervalNum);
      },
      getList(){
        var title = '';
        let lineCharts = this.$refs.lineCharts;
        this.sbbId = this.$route.query.sbbId;
        this.dateFrom = this.$route.query.dateFrom;
        this.dateTo = this.$route.query.dateTo;
        lineCharts.getChart().xAxis[0].setTitle({text:'时间'});
        if(this.itemStatus == 0){
          this.itemType="temperatureA";
         // this.getYearTime();
          title = '温度A';


       //   lineCharts.getChart().title.update({ text: title });
          lineCharts.getChart().yAxis[0].setTitle({text:'温度(摄氏度)'});
        //  lineCharts.addSeries({name: this.sbbName,data: [['2017-01',12],['2017-02',12],['2017-03',32],['2017-04',12]]});
        }
        this.getYearTime(lineCharts,'温度A');
        this.itemType="temperatureB";
        this.getYearTime(lineCharts,'温度B');
        this.itemType="temperatureC";
        this.getYearTime(lineCharts,'温度C');
        this.itemType="temperatureN";
        this.getYearTime(lineCharts,'温度N');
      },

      getRealTime(lineCharts){
        getMonthList(this.sbbId,this.dateFrom,this.dateTo,this.itemType).then(res => {
          var itemData = lineCharts.getChart().series[0].data;
          this.sbbName=res.name;
          lineCharts.addSeries({name: this.sbbName,data: []});
          for(var i=0;i<res.data.length;i++){

            //debugger;
            //添加一个点(flag为false,表示新增一个点的同时不移除最前面的数据点，如果flag为true,表示新增一个点的同时移除最前面的数据点)
         //   lineCharts.getChart().series[1].addPoint( [res.data[i].value,res.data[i].month] ,false,true);

            var x = (newDate()).getTime()(8 * 60 * 60 * 1000); // 当前时间
            var y;
            // 第一条线
            y = Math.floor(Math.random() * 70);
            var newPoint;
            newPoint = {
              x: x, // current time
              y: y,
              marker: {
                symbol: 'url(../../../Content/images/warnning.png)'
              }
            };
            lineCharts.getChart().series[1].addPoint(newPoint, false, true);  //只有第一条线的 第二个参数设为false
          }

         // lineCharts.getChart().redraw();
        })
      },
      async  getYearTime(lineCharts,title){
        await getMonthList(this.sbbId,this.dateFrom,this.dateTo,this.itemType).then(res => {
          this.placelist=[];
          this.sbbName=res.name;
          for(var i=0;i<res.data.length;i++){
            this.placelist.push([res.data[i].day,parseFloat(res.data[i].value)])
          }

          lineCharts.getChart().title.update({ text: this.sbbName });
          lineCharts.addSeries({name: title,data: this.placelist});
        })
      }

    },
    components: {
      vchooser,
      VueHighcharts,
      headTop,
      footGuide
    },
    mounted () {

      this.getList()
    }

  }

  function getCurrentTime(){
    var date = new Date();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return hour + ':' + minute + ':' + second;
  }

</script>

<style>
  *{margin:0;padding:0;  list-style:none }
  h1,h2,h3,h4,h5,h6{font-size:16px; font-weight:normal;}

  .rank-head{
    width: 100%;
    height: 40px;
    position:fixed;
    background: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));
    z-index: 999;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
  }

  .container{
    width: 100%;
    overflow: hidden
  }
.tabclass{
  margin-top: 1em;
  margin-bottom: 1em;
}
  .rank-head-back{
    display: block;
    float: left;
    width: 40px;
    height: 40px;
    background: url("/assets/index/back.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .footcss{
    height: 1.8rem;
  }

</style>
