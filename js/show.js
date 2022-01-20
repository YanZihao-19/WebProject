$(function() {
    var num = 12;
    var id = null;

    //新增图片
    //将button点击事件绑定到具有file类型的input上，实现点击button选择文件
    $('.button').click(function() {
        $(".button_hidden").click();
    });

    //filereader获取文件base64编码，填充到一个新<img>标签中
    $(".button_hidden").change(function() {
        var oFReader = new FileReader();
        var file = document.getElementById('upload').files[0]; //获取选择的文件对象
        oFReader.readAsDataURL(file); //解析为base64
        oFReader.onloadend = function(oFRevent) {
            var src = oFRevent.target.result; //解析后的base64编码值
            if (src !== null) {
                num = num + 1;
                var photo_block = $(".photo_block");
                photo_block.append("<img id='img_" + num + "' src='" + src + "'>"); //赋予一个新的<Img>对象，并为之添加新ID编号
            } else {
                alert("文件出错")
            }
        }
    })

    //监听所有图片以及可能尚未添加的<img>标签，并且显示大图
    $(".photo_block").on("click", "img", function() {
        id = $(this).attr("id");
        show(this);
    })

    //隐藏大图
    $(".big").click(function() {
        $(this).fadeOut("fast");
    })

    //显示大图
    function show(picture) {
        var src = $(picture).attr("src");

        //填充大图src
        $("#big_img").attr("src", src);

        //缩放图片。如果图片长>宽，则长边变为屏幕宽度的scale比例，如果此时高度大于屏幕高度
        //则再将高度缩放scale比例。反之同理
        var scale = 0.7;
        var windowW = $(window).width();
        var windowH = $(window).height();
        var realWidth = picture.width;
        var realHight = picture.height;
        var newHeight, newWidth;
        if (realWidth > realHight) {
            newWidth = windowW * scale;
            newHeight = newWidth * realHight / realWidth;
            if (newHeight > realHight) {
                let temp = newHeight;
                newHeight = newHeight * scale;
                newWidth = newHeight * newWidth / temp;
            }
        } else {
            newHeight = windowH * scale;
            newWidth = newHeight * realWidth / realHight;
            if (newHeight < realHight) {
                let temp = newWidth;
                newWidth = newWidth * scale;
                newHeight = newWidth * newHight / temp;
            }
        }

        var padding_top = (windowH - newHeight) / 2;
        var padding_left = (windowW - newWidth) / 2;

        $("#big_img").css("width", newWidth); //以最终的宽度对图片缩放
        $(".inner").css("padding-top", padding_top);
        $(".inner").css("padding-left", padding_left);
        $(".big").fadeIn("fast");
    }

    //删除
    $(".delete").click(function() {
        $("#" + id).remove();
    })

    //替换
    $(".replace").click(function() {
        $(".replace_hidden").click();
    })

    //替换，读取图片信息并替换已有DOM，方法同新增
    $(".replace_hidden").change(function() {
        var oFReader = new FileReader();
        var file = document.getElementById('replace').files[0];
        oFReader.readAsDataURL(file);
        oFReader.onloadend = function(oFRevent) {
            var newsrc = oFRevent.target.result;
            if (newsrc !== null) {
                $("#" + id).attr("src", newsrc)
            } else {
                alert("文件出错")
            }
        }
    })

})