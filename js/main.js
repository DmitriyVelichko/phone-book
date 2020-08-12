//Кнопка зарегистрироваться
$("#register").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize() + '&register=true' + '&ajax=true';
    $.ajax({
        method: 'post',
        data: data,
        success: function (data) {
            let returnedRegister = JSON.parse(data);
            $('.error').html(returnedRegister.error).attr("hidden", false);
            if(returnedRegister.book){
                window.location.href = '/book/';
                window.location.redirect;
            }
        }
    });
});

//Кнопка войти
$("#auth").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize() + '&auth=true' + '&ajax=true';
    $.ajax({
        method: 'post',
        data: data,
        success: function (data) {
            let returnedAuth = JSON.parse(data);
            $('.error').html(returnedAuth.error).attr("hidden", false);
            if(returnedAuth.book){
                window.location.href = '/book/';
                window.location.redirect;
            }
        }
    });
});

//Это просто вызов модалки
$(document).ready(function() {
    $('.myLinkModal').click( function(event){
        event.preventDefault();
        $('#myOverlay').fadeIn(297,	function(){
            $('#myModal')
                .css('display', 'block')
                .animate({opacity: 1}, 198);
        });
    });

    $('#myModal__close, #myOverlay').click( function(){
        $('#myModal').animate({opacity: 0}, 198, function(){
            $(this).css('display', 'none');
            $('#myOverlay').fadeOut(297);
        });
    });
});

//Кнопка выйти справа вверху
$('.linklogout').on('click', function (e) {
    e.preventDefault();
    let href = $(this).data('href');
    window.location.href = href;
});

// Для отправки всех полей формы в модалке
$('#addContact').click(function(e) {
    e.preventDefault();
    $('input').each(function(){
        if ($(this).val() === '')
            $(this).attr('disabled', true);
        $('select option:selected[value=""]')
            .parent()
            .attr('disabled', true);
    });
    $('form').submit();
});

// Сохранение картинки в форме (это не загрузка на сервер)
function save ()  {
    let f = file1.files[0];
    if (f) {
        image1.src = URL.createObjectURL(f);
        localStorage.setItem('myImage', image1.src);
    }
}

// Для подгрузки картинки в модалке
$.ajax(localStorage.getItem('myImage'), {
    success: function() {
        image1.src = localStorage.getItem('myImage');
    },
    method: "HEAD"
});

// Для увеличения картинки по клику
$(function(){
    $('.minimized').click(function(event) {
        var i_path = $(this).attr('src');
        $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
        $('#magnify').css({
            left: ($(document).width() - $('#magnify').outerWidth())/2,
            // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
            top: ($(window).height() - $('#magnify').outerHeight())/2
        });
        $('#overlay, #magnify').fadeIn('fast');
    });

    $('body').on('click', '#close-popup, #overlay', function(event) {
        event.preventDefault();

        $('#overlay, #magnify').fadeOut('fast', function() {
            $('#close-popup, #magnify, #overlay').remove();
        });
    });
});
