let AjaxContent = function () {

    let container_div = '';
    let content_div = '';
    return {
        getContent: function (url) {
            $(container_div).animate({opacity: 0}, //Прозрачность на 0
                function () { // загружает контент с помощью ajax
                    reloadScript("static/js/main.js");
                    $(container_div).load(url + " " + content_div, //загружает только выбранную часть
                        function () {
                            $(container_div).animate({opacity: 1}); //возвращает прозрачность обратно на  1
                        }
                    );
                });

        },

        ajaxify_links: function (elements) {
            $(elements).click(function () {
                AjaxContent.getContent(this.href);
                return false; //предотвращает нажатие на ссылку
            });
        },
        init: function (params) {
            //задает первоначальные настройки
            container_div = params.containerDiv;
            content_div = params.contentDiv;
            return this; //выводит объект
        }

    }

}();

$(function(){
    AjaxContent.init({containerDiv:'#ajax-wrap',contentDiv:'#text'}).ajaxify_links('#menu a');
});

function reloadScript(url) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.documentElement.appendChild(script);
}
