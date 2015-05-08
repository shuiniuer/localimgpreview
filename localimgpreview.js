;(function($){
    function localImgPreview(configObj){
        var config = {
            "inputElem": "#imgInput",
            "imgElem": "#imgPreviewTag",
            "width": 310,
            "height": 310,
            "defaultImg": "http://i00.c.aliimg.com/cms/upload/2014/704/088/1880407_1917015703.jpg",
            "error": function(){
                alert('图片格式常，请检查！');
            }
        };
        config = $.extend(config, configObj);
        
        $(config.inputElem).on('change',function(){
            var URL = window.URL || window.webkitURL;

            var hash = {
                '.gif'  : 1,
                '.jpg' : 1,
                '.png' : 1
            },
            re = /\..+$/;

            var obj=this,
                files = obj.files,
                img = $(config.imgElem)[0],
                fileName = $(obj).val(),
                ext = fileName.match(re);

            ext = ext[0].toLowerCase();

            if($.trim(fileName) === ''){
                img.src = config.defaultImg;
            }else{
                if (hash[ext]) {
                    if(URL){
                        //创建一个object URL，并不是本地路径
                        img.src = URL.createObjectURL(files[0]);
                        img.width = config.width;
                        img.onload = function(e) {
                            //图片加载后，释放object URL
                            URL.revokeObjectURL(this.src);
                        }
                    }else if(window.FileReader){
                        //opera不支持createObjectURL/revokeObjectURL方法;用FileReader对象来处理
                        var reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = function(e){
                            img.src = this.result;
                            img.width = config.width;
                        }
                    }else{
                        //IE下，使用滤镜
                        var docObj=document.getElementById("picDoc"),
                            imgSrc = document.selection.createRange().text,
                            localImg= document.getElementById("localImg");
                        
                        docObj.select();
                        //必须设置初始大小
                        localImg.style.width = config.width + "px";
                        localImg.style.height = config.height + "px";
                        //图片异常的捕捉，防止用户修改后缀来伪造图片
                        try{
                            localImg.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                            localImg.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                        }catch(e){
                            //执行错误提醒
                            config.error();
                            return false;
                        }
                        img.style.display = 'none';
                        document.selection.empty();
                    }
                }else{
                    //执行错误提醒
                    config.error();
                }
            }
        });
    };

    $.localImgPreview ? $.localImgPreview : $.localImgPreview = localImgPreview;

})(jQuery);
