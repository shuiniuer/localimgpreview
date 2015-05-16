# localimgpreview
一个纯前端实现的图片本地预览的jquery插件
如果浏览器端把安全策略调整为高的的话，则纯客户端实现的预览的方式将会失效

# 调用方式 demo （注意dom结构）
	<!DOCTYPE html>
	<html lang="zh-CN">
	  <head>
	    <meta http-equiv="Content-Type" content="text/html;  charset=UTF-8" />
	    <title>纯前端实现图片上传本地预览</title>
	    <script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
	    <script type="text/javascript" src="localimgpreview.js"></script>
	  </head>
	  <body>
	    <div id="previewTag">
	      <img src="http://52hdp.com/img/preview.jpg"/>
	    </div>
	    <input type="file" id="imgInput"/>
	  </body>
	  <script type="text/javascript">
	    (function($){
	      $(function(){
	        $.localImgPreview({
	          "inputElem": "#imgInput",
	          "previewElem": "#previewTag",
	          "width": 310,
	          "height": 310,
	          "defaultImg": "http://52hdp.com/img/preview.jpg",
	          "error": function(){
	              alert('图片格式常，请检查！');
	          }
	        });
	      });
	    })(jQuery);
	  </script>
	</html>

#参数解释
	"inputElem": 用于上传图片的input元素（必填）
    "previewElem": 用于预览图片的img元素（必填）
    "width": 310（必填）
    "height": 310（非必填）
    "defaultImg": 没有选择本地图片时默认显示的图片（必填）
    "error": 图片格式异常时的回调函数（必填）