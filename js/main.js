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

        if ($('#file1').val() !== '' && $('#file1').val() !== null && $('#file1').val() !== 'no_photo.jpg') {
            $('#lblremphoto').attr('hidden', false);
        } else {
            $('#lblremphoto').attr('hidden', true);
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
        $('#modalImage').attr('src', '/uploads/no_photo.jpg');
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

        if (photo !== '' && photo !== null && photo !== 'no_photo.jpg') {
            $('#lblremphoto').attr('hidden', false);
        } else {
            $('#lblremphoto').attr('hidden', true);
        }

        $('#myOverlay').fadeIn(297, function () {
            $('#myModal')
                .css('display', 'block')
                .animate({opacity: 1}, 198);
        });

        newContact = false;
    });

    $(document).on('click', '.tbodytrash', function (event) {
        if (confirm('Вы уверены?')) {
            let arr = $(event.target.closest('.mytbody')).find('.mytr input');
            let arr2 = [];

            $.each(arr, function (index, elem) {
                arr2.push($(elem).val());
            })

            let id = arr2[0];
            let data = new FormData();
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
                    $('#mytbody' + item.id).remove();
                }
            });
        }
    });

    // Для отправки всех полей формы в модалке
    $('#modalAddContact').on('submit', function (e) {
        e.preventDefault()

        let form = $(this);
        let data = new FormData();

        // Сбор данных из обычных полей
        form.find(':input[name]').not('[type="file"]').each(function () {
            let field = $(this);
            data.append(field.attr('name'), field.val());
        });
        data.append('newContact', newContact);

        let filesField = form.find('input[type="file"]');
        let fileName = filesField.attr('name');
        let file = filesField.prop('files')[0];

        if (
            $(document.getElementById('file1')).val() !== ''
            ||
            (
                $(document.getElementById('file1')).val() === ''
                &&
                $(document.getElementById('modalImage')).attr('src') === "/uploads/no_photo.jpg"
            )
        ) {
            let FileSize;
            if (typeof file !== "undefined") {
                FileSize = file.size / 1024 / 1024; // in MB
            } else {
                FileSize = 0;
            }
            if (FileSize < 2) {
                if (typeof file !== "undefined") {
                    data.append(fileName, file);
                }
            } else {
                let blockPhoto = $('.blockPhoto');
                let src = $(document).find('#modalImage').attr('src');
                blockPhoto.find('#file1').val('');
                if(src === '') {
                    src = '/uploads/no_photo.jpg';
                }
                blockPhoto.find('#modalImage').attr('src', src);
                $('#lblremphoto').attr('hidden', 'true');
            }
        }

        if (
            $(document.getElementById('modalImage')).attr('src') !== "/uploads/no_photo.jpg"
            &&
            $(document.getElementById('file1')).val() === ''
        ) {
            data.append('photo', $(document.getElementById('modalImage')).attr('src').replace("/uploads/", ""));
        }

        if ($('#first_name').val() === '' && $('#last_name').val() === '' && $('#phone').val() === '' && $('#email').val() === '') {
            alert('Введите данные!');
            return false;
        }

        // Отправка данных
        $.ajax({
            type: 'POST',
            data: data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                let mytbody = $.parseJSON(response);
                let dataSort;
                let mytbodyid;
                switch ($('.active').attr('data-field')) {
                    case 'trfirstname':
                        dataSort = mytbody.first_name;
                        break;
                    case 'trlastname':
                        dataSort = mytbody.last_name;
                        break;
                    case 'trphone':
                        dataSort = mytbody.phone;
                        break;
                    case 'tremail':
                        dataSort = mytbody.email;
                        break;
                    default:
                        dataSort = mytbody.id;
                        break;
                }
                mytbodyid = ($('.mytbody').length > 0) ? $('.mytbody').length + 1 : 1;
                let template = "<div class=\"row mytbody\" id=\"mytbody" + mytbody.id + "\" data-sort=\"" + dataSort + "\">\n" +
                    "    <div class=\"col-sm mytr trid\" style=\"max-width: 71px\">\n" +
                    "        <label for=\"mytbodyid" + mytbody.id + "\">" + mytbodyid + "</label>\n" +
                    "        <input id=\"mytbodyid" + mytbody.id + "\" name=\"mytbodyid\" type=\"text\" value=\"" + mytbody.id + "\" readonly hidden>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr trfirstname\">\n" +
                    "        <label for=\"mytbodyfirstname" + mytbody.id + "\">" + mytbody.first_name + "</label>\n" +
                    "        <input id=\"mytbodyfirstname" + mytbody.id + "\" name=\"mytbodyfirstname\" type=\"text\" value=\"" + mytbody.first_name + "\" readonly hidden>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr trlast_name\">\n" +
                    "        <label for=\"mytbodylastname" + mytbody.id + "\">" + mytbody.last_name + "</label>\n" +
                    "        <input id=\"mytbodylastname" + mytbody.id + "\" name=\"mytbodylastname\" type=\"text\" value=\"" + mytbody.last_name + "\" readonly hidden>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr trphone\">\n" +
                    "        <div class=\"helptip\" title=\"Перевод\">\n" +
                    "            <label for=\"mytbodyphone" + mytbody.id + "\">" + mytbody.phone + "</label>\n" +
                    "            <div title=\"Закрыть\" class=\"mytbodyphonedescription\"></div>\n" +
                    "        </div>\n" +
                    "        <input id=\"mytbodyphone" + mytbody.id + "\" name=\"mytbodyphone\" type=\"text\" value=\"" + mytbody.phone + "\" readonly hidden>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr tremail\">\n" +
                    "        <label for=\"mytbodyemail" + mytbody.id + "\">" + mytbody.email + "</label>\n" +
                    "        <input id=\"mytbodyemail" + mytbody.id + "\" name=\"mytbodyemail\" type=\"text\" value=\"" + mytbody.email + "\" readonly hidden>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr trphoto\">\n" +
                    "        <input id=\"mytbodyimagename" + mytbody.id + "\" name=\"mytbodyimagename\" type=\"text\" class=\"bodyImageName\" value=\"" + mytbody.photo + "\" readonly hidden>\n" +
                    "        <div class=\"image__wrapper\">\n" +
                    "            <img src=\"/uploads/" + mytbody.photo + "\" class=\"minimized bodyImage\" alt=\"клик для увеличения\"/>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr trbuttons\">\n" +
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
                if (newContact === 'true') {
                    newContact = true;
                }
                if (newContact === 'false') {
                    newContact = false;
                }
                if (newContact) {
                    $('.mytable').append(template);
                    sortBodyElements();
                } else {
                    let arr3 = $('#mytbody' + mytbody.id).find('.mytr input');
                    let arr4 = [mytbody.id, mytbody.first_name, mytbody.last_name, mytbody.phone, mytbody.email, mytbody.photo];

                    $.each(arr3, function (index, elem) {
                        let inputid = $(elem).attr('id');
                        $(document).find('#'+inputid).val(arr4[index]); //обновить input поля
                        if(inputid === 'mytbodyphone'+mytbody.id) {
                            $(document).find('#'+inputid).siblings('.helptip').find('label').text(arr4[index]) //обновить label для телефона
                        } else {
                            if(inputid !== 'mytbodyid'+mytbody.id){
                                $(document).find('#'+inputid).siblings('label').text(arr4[index]); //обновить label
                            }
                        }
                    })
                }
                $('#myModal').animate({opacity: 0}, 198, function () {
                    $(this).css('display', 'none');
                    $('#myOverlay').fadeOut(297);
                });

                if (mytbody.photo !== '') {
                    $('#mytbody' + mytbody.id).find('.bodyImage').attr('src', '/uploads/' + mytbody.photo).css({
                        width: '160px',
                        height: '90px'
                    });
                } else {
                    mytbody.photo = 'no_photo.jpg';
                    $('#mytbody' + mytbody.id).find('.bodyImage').attr('src', '/uploads/' + mytbody.photo).css({
                        width: '1px',
                        height: '1px'
                    });
                }
                $('#mytbody' + mytbody.id).find('.bodyImageName').attr('value', mytbody.photo);

                $(document.getElementById('modalImage')).attr('src', '/uploads/no_photo.jpg');
                document.getElementById('modalAddContact').reset();
            }
        });
    })

    // Для увеличения картинки по клику
    $(document).on('click', '.minimized', function (event) {
        let i_path = $(this).attr('src');
        $('body').append('<div id="overlay"></div><div id="magnify"><img src="' + i_path + '"><div id="close-popup"><i></i></div></div>');
        let fixHeight = $(window).height();

        switch ($(window).width()) {
            case 1024:
                fixHeight = 768;
                break;
            case 1152:
                fixHeight = 864;
                break;
            case 1200:
                fixHeight = 600;
                break;
            case 1280:
                fixHeight = 720;
                break;
            case 1440:
                fixHeight = 900;
                break;
            case 1536:
                fixHeight = 960;
                break;
            case 1600:
                fixHeight = 900;
                break;
            case 1680:
                fixHeight = 1050;
                break;
            case 1920:
                fixHeight = 1080;
                break;
            case 2048:
                fixHeight = 1152;
                break;
            case 2560:
                fixHeight = 1440;
                break;
            case 3200:
                fixHeight = 2048;
                break;
            case 3840:
                fixHeight = 2400;
                break;
            case 4096:
                fixHeight = 2160;
                break;
        }
        $('#magnify').css({
            left: 0,
            top: '-65px',
            width: $(window).width(),
            height: fixHeight,
            padding: '100px'
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

    //Сортировка
    $(document).on('click', '.myth', function (event) {
        let upJQObject = $($(event.target.closest('.myth')).find('.fa-sort-up').get(0));
        let downJQObject = $($(event.target.closest('.myth')).find('.fa-sort-down').get(0));
        let order = 'asc';

        //Условие, все поля кроме фото и кнопок
        if (typeof upJQObject.get(0) !== "undefined") {
            if (upJQObject.attr('hidden') === 'hidden') {
                //Если вниз не видна, то показываем
                removeAllSortArrow(event);

                upJQObject.removeAttr('hidden');//Показываем вниз
                downJQObject.attr('hidden', true);//Скрываем вверх

                order = 'asc'
            } else {
                //иначе показываем вверх и вниз скрываем
                removeAllSortArrow(event)

                downJQObject.removeAttr('hidden');//Показываем вверх
                upJQObject.attr('hidden', true);//скрываем вниз

                order = 'desc'
            }
            $(event.target.closest('.myth')).addClass('active');
            document.querySelector('.active').setAttribute('data-order', order);
            let dataAttrib = document.querySelector('.active').getAttribute('data-field');
            let elements = $('.' + dataAttrib).find('input');
            let valElem;
            //Это перебор столбика инпутов. Нужно заменить дата атрибуты если изменилось поле сортировки
            elements.each(function (index, value) {
                valElem = $(value).val();
                if ($('.active').attr('data-field') === 'trphone') {
                    //Сортировка для телефона (нужно удалить скобочки и другие символы)
                    valElem = $(value).val().replace(/\D+/g, "");
                }
                $(value).closest('.mytbody').attr('data-sort', valElem);//Меняю дата атрибут, так как по нему сортирую
            })

            sortBodyElements(order);
        }
    });

    //Описание подсказки генерируется тут
    $(document).on('click', '.helptip', function (e) {
        let phoneDescs = $(this).find('label').html();
        phoneDescs = phoneDescs.replace(/[_\W]+/g, " ").split(" ");
        let key;
        let result = '';

        for (key in phoneDescs) {
            let str = rubles(phoneDescs[key]);
            result = result + str;
        }

        $(this).find('.mytbodyphonedescription').html('').append(result);
        helptip(this);
    });

    //Кнопка удалить картинку
    $(document).on('click', '#lblremphoto', function () {
        let blockPhoto = $('.blockPhoto');
        blockPhoto.find('#file1').val('');
        blockPhoto.find('#modalImage').attr('src', '/uploads/no_photo.jpg');
        $('#lblremphoto').attr('hidden', 'true');
    });

    $("#phone").mask("+7(999)999-99-99");
    $("#email").inputmask("email", {placeholder: ""});
    $("#login").inputmask("email", {placeholder: ""});

    sortBodyElements();
});

// Основная функция, передаем в нее обрабатываемый тег
// или this (для текущего тега)
function helptip(t) {
    // Разрешаем закрытие подсказок
    // Создаем постоянную переменную этой функции для этих целей
    // Условимся: если ноль, то можно закрывать, а если единица, то нельзя
    helptip.v = 0;
    // Берем последний дочерний тег
    var b = t.children[(t.children.length - 1)];
    // Если открыт, то закрываем
    if (b.style.display == "block") helptipx();
    else {
        // Закрываем все
        helptipx();
        // Открываем текущий
        b.style.display = "block";
        // Запрещаем закрытие подсказки вызванного последующими событиями
        helptip.v = 1;
    }
}

// Функция закрывает все подсказки
function helptipx() {
    // Если было нажатие для открытия подсказки, то закрывать нельзя
    // Поэтому проверяем:
    if (helptip.v == 1) {
        // Разрешаем закрытие в будущем
        helptip.v = 0;
        // И выходим
        return;
    }
    // Выбираем все теги с классом .helptip
    var s = document.querySelectorAll(".helptip");
    // и перебираем их циклом
    for (var i = 0; i < s.length; i++) {
        // Скрываем последний дочерний тег
        s[i].children[(s[i].children.length - 1)].style.display = "none";
    }
}

//Удаляет все hidden и active перед активацией конкретной колонки
function removeAllSortArrow(event) {
    let allSortJQObjects = $($(event.target.closest('.mythead')).find('.fa-sort'));
    let allSortUpJQObjects = $($(event.target.closest('.mythead')).find('.fa-sort-up'));
    let allSortDownJQObjects = $($(event.target.closest('.mythead')).find('.fa-sort-down'));

    allSortJQObjects.each(function (index, sort) {
        $(sort).attr('hidden', true);
    });
    allSortUpJQObjects.each(function (index, sortUp) {
        $(sortUp).attr('hidden', true);
    });
    allSortDownJQObjects.each(function (index, sortDown) {
        $(sortDown).attr('hidden', true);
    });

    $('.myth').each(function (index, item) {
        $(item).removeClass('active').removeData("order");
    });
}

//Сортировка элементов
function sortBodyElements(order = 'asc') {
    let result = $('.mytbody').sort(
        function (a, b) {
            let contentA = isNumber(parseInt($(a).data('sort'))) ? parseInt($(a).data('sort')) : $(a).data('sort').toLowerCase();
            let contentB = isNumber(parseInt($(b).data('sort'))) ? parseInt($(b).data('sort')) : $(b).data('sort').toLowerCase();

            return ((order === 'asc') ? 1 : -1) * ((contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0);
        }
    );
    $('.dinamicalBody').html(result);
}

function isNumber(num) {
    let result = [];
    num = String(num);
    result = num.match(/(\d+)/g);
    return (result !== null) ? (result.length > 0) : false;
}

function autoloadimg() {
    let f = file1.files[0];
    let FileSize = f.size / 1024 / 1024; // in MB
    if (FileSize > 2) {
        alert("Файл больше 2Мб!");
        return false;
    }
    var re = /(\.jpg|\.jpeg|\.png)$/i;
    if (!re.exec(f.name)) {
        alert("Этот тип файлов не поддерживается!");
    }

    if (f) {
        modalImage.src = URL.createObjectURL(f);
        localStorage.setItem('myImage', modalImage.src);
        $('#lblremphoto').removeAttr('hidden');
    }
}