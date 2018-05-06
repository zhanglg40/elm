 <template>
  <div class="detail_page">
    <head-top head-title="电流超标与温度超标的危害" go-back='true'>  </head-top>
        <section id="scroll_section" class="scroll_container">
         <!--   <section v-html="markdownText" class="markdown"></section>-->
          <div></div>
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
	            return converter.makeHtml('<ul><li>123</li><li>123</li></ul><div>12</div><button v-el:button v-on:click="click">click me</button>');
	        }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

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
        top: 0;
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
