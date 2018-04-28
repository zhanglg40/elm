/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = 'http://localhost:8181/power_cloud_manager/api';
/*let baseUrl = 'http://120.27.216.225:8081/power_cloud_manager/api';*/
let routerMode = 'hash';
let imgBaseUrl;


if (process.env.NODE_ENV == 'development') {
  imgBaseUrl = 'http://cangdu.org:8001/img/';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'http://120.27.216.225:8081/power_cloud_manager/api';
  imgBaseUrl = 'http://120.27.216.225:8081/img/';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}
