;(function($){
    function localImgPreview(config){

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
                previewElem = $(config.previewElem),
                img = previewElem.find('img')[0],
                fileName = $(obj).val();

            if($.trim(fileName) === ''){
                img.src = config.defaultImg;
            }else{
                var ext = fileName.match(re);
                ext = ext[0].toLowerCase();
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
                        previewElem = previewElem[0];
                        var imgSrc = document.selection.createRange().text;
                        
                        obj.select();
                        //必须设置初始大小
                        previewElem.style.width = config.width + "px";

                        if(typeof config.height === 'undefined'){
                            config.height = config.width;
                        }
                        
                        previewElem.style.height = config.height + "px";
                        //图片异常的捕捉，防止用户修改后缀来伪造图片
                        try{
                            previewElem.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                            previewElem.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
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
