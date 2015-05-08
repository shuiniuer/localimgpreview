# localimgpreview
 一个浏览器本地图片预览的jquery插件

# 调用方式
 	$.localImgPreview({
 		"inputElem": "#imgInput",
        "imgElem": "#imgPreviewTag",
        "width": 310,
        "height": 310,
        "defaultImg": "http://i00.c.aliimg.com/cms/upload/2014/704/088/1880407_1917015703.jpg",
        "error": function(){
            alert('图片格式常，请检查！');
        }
	});