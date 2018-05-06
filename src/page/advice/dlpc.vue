 <template>
  <div class="detail_page">
    <head-top head-title="电流超标与温度超标的排查方法" go-back='true'>  </head-top>
    <section id="scroll_section" class="scroll_container">
      <!--   <section v-html="markdownText" class="markdown"></section>-->
      <ul>
        <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;经过合理科学计算增大线径和空开，使其达到正常的读数</li>
        <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;减少用电设备，或做到合理分流</li>
        <li class="fontsize">&nbsp;&nbsp;<img src="http://p9.qhimg.com/t01359c712d3694156f.png" style="width:5px;height:8px" class="item-num">&nbsp;&nbsp;检查线路是否存在安全隐患</li>
      </ul>
    </section>
  </div>
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
    .fontsize{
      font-size: 0.7rem;
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
