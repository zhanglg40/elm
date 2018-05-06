 <template>
  <div class="detail_page">
        <head-top  head-title="电路漏电的危害" go-back='true'></head-top>
        <section id="scroll_section" class="scroll_container">
          <ul>
            <li class="fontsize">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;漏电会造成人身触电，产生电火花，故障电弧，过热高温等造成火灾，而且还会造成用电浪费，造成经济损失。</li>
            <li class="fontsize">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;设备漏电时，电流将设备外壳、保护接地线、大地形成闭合电路，造成人身触电或线路短路事故，通常情况下漏电流过大时，会使熔断器动作而切断电源，影响生活与生产。
            但由于以下几种情况使得熔断器失去作用从而造成更大损失：</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              实际运行当中熔断器规格被人为加大数倍或被铜丝代替，起不到过流保护作用</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              电故障点可能发生在系统足够远的末端，故障回路阻抗较大，造成漏电电流较小不足以令熔断器动作</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              电气设备容量够大，熔体额定电流超过漏电电流时，熔断器不会动作</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              接地装置不符合要求，接地电阻较大，导致漏电流较小也不会使熔断器动作</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              采用过电流自动保护开关时，开关失灵或拓抠电流设置过大，自动保护开关不会动作</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              接保护接零(接地)线的接线端子连接不牢，造成接触电阻过大，限制了故障电流，致使熔断器不动作</li>
            <li class="fontsize">&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              线路漏电一般为相线的绝缘老化或损坏产生的异常电流，通常会有以下几种情况造成漏电火灾：</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              漏电点接触不牢，似接非接，导致接触电阻较大，故障点处会产生电弧，引燃周边可燃物</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
               保护零线或保护地线的的接线端子接触不良，限制了故障电流，引起漏电火灾</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              漏电电压持续发生后，由于电流不能及时流散而寻找阻抗小的另一回路接地，电弧连续发生，点燃周围可燃物。此时由于电压的传导，漏电点与起火点不一定一致</li>
          </ul>
        </section>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {mapState, mapMutations} from 'vuex'
    import showdown from 'showdown'
    import BScroll from 'better-scroll'

    export default {
      data(){
            return{

            }
        },
        components: {
            headTop,
        },
        mounted(){
            this.$nextTick(() => {
                new BScroll('#scroll_section', {
                    deceleration: 0.001,
                    bounce: true,
                    swipeTime: 1800,
                    click: true,
                });
            })
        },
        computed: {
        	...mapState([
	            'question',
	        ]),
	        markdownText: function (){
                //转换markDown格式
	        	let converter = new showdown.Converter();
	            return converter.makeHtml(this.question.detail);
	        }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .srhCondion{
      font-weight:bold;
      padding-top: 0.25rem;
    }
    .fontsize{
      font-size: 0.7rem;
      padding-top: 0.25rem;
    }
    .detail_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .scroll_container{
        position: fixed;
      top: 1rem;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
        overflow-y: auto;
    }
    .markdown{
    	font-size: .65rem;
    	padding: 0 .7rem;
        color: #666;
        padding-bottom: 2rem;
    }

</style>
