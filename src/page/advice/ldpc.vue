 <template>
  <div class="detail_page">
        <head-top  head-title="漏电的排查方法" go-back='true'></head-top>
        <section id="scroll_section" class="scroll_container">
          <ul>
            <h5 class="srhCondion">排查条件</h5>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;排查人员≥2人</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;排查人需具备电工资质</li>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;大口径钳形电流表</li>
            <h5 class="srhCondion">分析故障原因</h5>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              根据历史数据(平台内的历史数据或报表中的初步诊断内容),观察漏电规律，初步判定漏电区域</li>
            <h5 class="srhCondion">逐个切除法</h5>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              保持整体设备运行，观察探测器剩余电流读数，逐个切断电气柜内的空开，通过剩余电流读数判断故障所处区域</li>
            <h5 class="srhCondion">带电检查法</h5>
            <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;
              保持线路供电，记录总漏电电流;随后分别测量各分支线路的漏电电流，逐路逐级排查，直至确认故障区域</li>
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
      padding-top: 0.35rem;
    }
    .fontsize{
      font-size: 0.7rem;
      padding-top: 0.35rem;
    }
    .detail_page{
        position: fixed;
        top: 1rem;
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
