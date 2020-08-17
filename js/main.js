$(document).ready(function () {
    let newContact = true;
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
    $('.myLinkModal').click(function (event) {
        event.preventDefault();
        newContact = true;
        $('input').each(function () {
            if ($(this).val() === '')
                $(this).attr('disabled', false);
            $('select option:selected[value=""]')
                .parent()
                .attr('disabled', false);
        });

        if($('#file1').val() !== '' && $('#file1').val() !== null && $('#file1').val() !== 'no_photo.jpg'){
            $('#lblremphoto').attr('hidden',false);
        } else {
            $('#lblremphoto').attr('hidden',true);
        }

        $('#myOverlay').fadeIn(297, function () {
            $('#myModal')
                .css('display', 'block')
                .animate({opacity: 1}, 198);
        });
    });

    //Закрытие модалки
    $('#myModal__close, #myOverlay').click(function () {
        $('#myModal').animate({opacity: 0}, 198, function () {
            $(this).css('display', 'none');
            $('#myOverlay').fadeOut(297);
        });
        $('#modalImage').attr('src','/uploads/no_photo.jpg');
        newContact = true;
        $(document.getElementById('modalImage')).attr('src', '/uploads/no_photo.jpg');
        document.getElementById('modalAddContact').reset();
    });

    //Кнопка редактирование в модалке
    $(document).on('click', '.tbodyedit', function (event) {
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
        let photo = (arr2[5] !== null && arr2[5] !== '') ? arr2[5] : 'no_photo.jpg';

        $(document.getElementById('id')).val(id);
        $(document.getElementById('first_name')).val(name);
        $(document.getElementById('last_name')).val(fam);
        $(document.getElementById('phone')).val(phone);
        $(document.getElementById('email')).val(email);
        $(document.getElementById('modalImage')).attr('src', '/uploads/' + photo);

        if(photo !== '' && photo !== null && photo !== 'no_photo.jpg'){
            $('#lblremphoto').attr('hidden',false);
        } else {
            $('#lblremphoto').attr('hidden',true);
        }

        $('#myOverlay').fadeIn(297, function () {
            $('#myModal')
                .css('display', 'block')
                .animate({opacity: 1}, 198);
        });

        newContact = false;
    });

    $(document).on('click', '.tbodytrash',  function (event) {
        if(confirm('Вы уверены?'))
        {
            let arr = $(event.target.closest('.mytbody')).find('.mytr input');
            let arr2 = [];

            $.each(arr, function (index, elem) {
                arr2.push($(elem).val());
            })

            let id = arr2[0];
            var data = new FormData();
            data.append('removeItem', true);
            data.append('id', id);
            data.append('ajax', 1);

            $.ajax({
                type: 'POST',
                data: data,
                contentType: false,
                cache: false,
                processData: false,
                success: function (response) {
                    let item = $.parseJSON(response);
                    $('#mytbody'+item.id).remove();
                }
            });
        }
    });

    // Для отправки всех полей формы в модалке
    $('#modalAddContact').on('submit', function (e) {
        e.preventDefault()

        var form = $(this);
        var data = new FormData();

        // Сбор данных из обычных полей
        form.find(':input[name]').not('[type="file"]').each(function () {
            var field = $(this);
            data.append(field.attr('name'), field.val());
        });
        data.append('newContact', newContact);

        // Сбор данных о файле (будет немного отличаться для нескольких файлов)
        var filesField = form.find('input[type="file"]');
        var fileName = filesField.attr('name');
        var file = filesField.prop('files')[0];
        data.append(fileName, file);

        // Отправка данных
        $.ajax({
            type: 'POST',
            data: data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                let mytbody = $.parseJSON(response);
                let template = "<div class=\"row mytbody\" id=\"mytbody"+ mytbody.id +"\">\n" +
                    "    <div class=\"col-sm mytr\">\n" +
                    "        <input type=\"text\" value=\"" + mytbody.id + "\" style=\"display: none\">\n" +
                    "        <input type=\"text\" value=\"" + mytbody.first_name + "\" readonly>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr\">\n" +
                    "        <input type=\"text\" value=\"" + mytbody.last_name + "\" readonly>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr\">\n" +
                    "        <input type=\"text\" value=\"" + mytbody.phone + "\" readonly>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr\">\n" +
                    "        <input type=\"text\" value=\"" + mytbody.email + "\" readonly>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr\">\n" +
                    "        <input type=\"text\" class=\"bodyImageName\" value=\"" + mytbody.photo + "\" style=\"display: none\">\n" +
                    "        <div class=\"image__wrapper\">\n" +
                    "            <img src=\"/uploads/" + mytbody.photo + "\" class=\"minimized bodyImage\" alt=\"клик для увеличения\"/>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr\">\n" +
                    "        <div class=\"tbodyedit showhim\">\n" +
                    "            <div class=\"showme\"><i class=\"far fa-edit\"></i></div>\n" +
                    "            <div class=\"ok\"><i class=\"fas fa-edit\"></i></div>\n" +
                    "        </div>\n" +
                    "        <div class=\"showhim tbodytrash\">\n" +
                    "            <div class=\"showme\"><i class=\"far fa-trash-alt\"></i></div>\n" +
                    "            <div class=\"ok\"><i class=\"fas fa-trash-alt\"></i></div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</div>";
                if(newContact) {
                    $('.mytable').append(template);
                } else {
                    let arr3 = $('#mytbody'+mytbody.id).find('.mytr input');
                    let arr4 = [mytbody.id, mytbody.first_name, mytbody.last_name, mytbody.phone, mytbody.email, mytbody.photo];

                    $.each(arr3, function (index, elem) {
                        $($(elem)).val(arr4[index])
                    })
                }
                $('#myModal').animate({opacity: 0}, 198, function () {
                    $(this).css('display', 'none');
                    $('#myOverlay').fadeOut(297);
                });

                if(mytbody.photo !== '') {
                    $('#mytbody'+mytbody.id).find('.bodyImage').attr('src','/uploads/'+mytbody.photo).css({width: '160px', height: '90px'});
                } else {
                    mytbody.photo = 'no_photo.jpg';
                    $('#mytbody'+mytbody.id).find('.bodyImage').attr('src','/uploads/'+mytbody.photo).css({width: '1px', height: '1px'});
                }
                $('#mytbody'+mytbody.id).find('.bodyImageName').attr('value',mytbody.photo);

                $(document.getElementById('modalImage')).attr('src', '/uploads/no_photo.jpg');
                document.getElementById('modalAddContact').reset();
            }
        });
    })

    // Для увеличения картинки по клику
    $(document).on('click', '.minimized', function (event) {
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

    // Для подгрузки картинки в модалке
    $.ajax(localStorage.getItem('myImage'), {
        success: function () {
            modalImage.src = localStorage.getItem('myImage');
        },
        method: "HEAD"
    });
});

// Сохранение картинки в форме (это не загрузка на сервер)
function save() {
    let f = file1.files[0];
    if (f) {
        modalImage.src = URL.createObjectURL(f);
        localStorage.setItem('myImage', modalImage.src);
    }
}

function remImg() {
    let blockPhoto = $('.blockPhoto');
    blockPhoto.find('#file1').val('');
    blockPhoto.find('#modalImage').attr('src','/uploads/no_photo.jpg');
}