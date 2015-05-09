# localimgpreview
 一个浏览器本地图片预览的jquery插件

# 调用方式
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

#参数解释
	"inputElem": 用于上传图片的input元素（必填）
    "imgElem": 用于预览图片的img元素（必填）
    "width": 310（必填）
    "height": 310（非必填）
    "defaultImg": 没有选择本地图片时默认显示的图片（必填）
    "error": 图片格式异常时的回调函数（必填）