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
            if (returnedRegister.book) {
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
            if (returnedAuth.book) {
                window.location.href = '/book/';
                window.location.redirect;
            }
        }
    });
});

//Кнопка выйти справа вверху
$('.linklogout').on('click', function (e) {
    e.preventDefault();
    let href = $(this).data('href');
    window.location.href = href;
});

//Это просто вызов модалки
$(document).ready(function () {
    $('.myLinkModal').click(function (event) {
        event.preventDefault();
        $('input').each(function () {
            if ($(this).val() === '')
                $(this).attr('disabled', false);
            $('select option:selected[value=""]')
                .parent()
                .attr('disabled', false);
        });
        $('#myOverlay').fadeIn(297, function () {
            $('#myModal')
                .css('display', 'block')
                .animate({opacity: 1}, 198);
        });
    });

    $('#myModal__close, #myOverlay').click(function () {
        $('#myModal').animate({opacity: 0}, 198, function () {
            $(this).css('display', 'none');
            $('#myOverlay').fadeOut(297);
        });
        document.getElementById('modalAddContact').reset();
    });

    $('.tbodyedit').on('click', function (event) {
        let arr = $(event.target.closest('.mytbody')).find('.mytr input');
        let arr2 = [];

        $.each(arr, function (index, elem) {
            arr2.push($(elem).val());
        })

        let id = arr2[0];
        let name = arr2[1];
        let fam = arr2[2];
        let phone = arr2[3];
        let email = arr2[4];
        let photo = arr2[5];

        $(document.getElementById('id')).val(id);
        $(document.getElementById('first_name')).val(name);
        $(document.getElementById('last_name')).val(fam);
        $(document.getElementById('phone')).val(phone);
        $(document.getElementById('email')).val(email);
        $(document.getElementById('image1')).attr('src', '/uploads/' + photo);

        $('#myOverlay').fadeIn(297, function () {
            $('#myModal')
                .css('display', 'block')
                .animate({opacity: 1}, 198);
        });
    });
});

// Для отправки всех полей формы в модалке
// $('#addContact').click(function (e) {
//     e.preventDefault();
//     $('input').each(function () {
//         if ($(this).val() === '')
//             $(this).attr('disabled', true);
//         $('select option:selected[value=""]')
//             .parent()
//             .attr('disabled', true);
//     });
//
//     $('form').submit();
// });
$(function(){
    $('#modalAddContact').on('submit', function(e){
        e.preventDefault();
        var $that = $(this),
            formData = new FormData($that.get(0)); // создаем новый экземпляр объекта и передаем ему нашу форму (*)
        $.ajax({
            contentType: false, // важно - убираем форматирование данных по умолчанию
            processData: false, // важно - убираем преобразование строк по умолчанию
            data: formData,
            success: function(json){
                if(json){
                    // тут что-то делаем с полученным результатом
                }
            }
        });
    });
});
// Сохранение картинки в форме (это не загрузка на сервер)
function save() {
    let f = file1.files[0];
    if (f) {
        image1.src = URL.createObjectURL(f);
        localStorage.setItem('myImage', image1.src);
    }
}

// Для подгрузки картинки в модалке
$.ajax(localStorage.getItem('myImage'), {
    success: function () {
        image1.src = localStorage.getItem('myImage');
    },
    method: "HEAD"
});

// Для увеличения картинки по клику
$(function () {
    $('.minimized').click(function (event) {
        var i_path = $(this).attr('src');
        $('body').append('<div id="overlay"></div><div id="magnify"><img src="' + i_path + '"><div id="close-popup"><i></i></div></div>');
        $('#magnify').css({
            left: ($(document).width() - $('#magnify').outerWidth()) / 2,
            // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
            top: ($(window).height() - $('#magnify').outerHeight()) / 2
        });
        $('#overlay, #magnify').fadeIn('fast');
    });

    $('body').on('click', '#close-popup, #overlay', function (event) {
        event.preventDefault();

        $('#overlay, #magnify').fadeOut('fast', function () {
            $('#close-popup, #magnify, #overlay').remove();
        });
    });
});
