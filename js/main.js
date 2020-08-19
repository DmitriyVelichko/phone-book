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
                    $('#mytbody' + item.id).remove();
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


        var filesField = form.find('input[type="file"]');
        var fileName = filesField.attr('name');
        var file = filesField.prop('files')[0];

        if (
            $(document.getElementById('file1')).val() !== ''
            ||
            (
                $(document.getElementById('file1')).val() === ''
                &&
                $(document.getElementById('modalImage')).attr('src') === "/uploads/no_photo.jpg"
            )
        ) {
            data.append(fileName, file);
        }

        if (
            $(document.getElementById('modalImage')).attr('src') !== "/uploads/no_photo.jpg"
            &&
            $(document.getElementById('file1')).val() === ''
        ) {
            data.append('photo', $(document.getElementById('modalImage')).attr('src').replace("/uploads/", ""));
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
                let template = "<div data-sort=\"" + mytbody.id + "\" class=\"row mytbody\" id=\"mytbody" + mytbody.id + "\">\n" +
                    "    <div class=\"col-sm mytr trid\" hidden>\n" +
                    "        <input type=\"text\" value=\"" + mytbody.id + "\">\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr trfirstname\">\n" +
                    "        <input type=\"text\" value=\"" + mytbody.first_name + "\" readonly>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr trlast_name\">\n" +
                    "        <input type=\"text\" value=\"" + mytbody.last_name + "\" readonly>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr trphone\">\n" +
                    "        <input type=\"text\" value=\"" + mytbody.phone + "\" readonly>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr tremail\">\n" +
                    "        <input type=\"text\" value=\"" + mytbody.email + "\" readonly>\n" +
                    "    </div>\n" +
                    "    <div class=\"col-sm mytr trphoto\">\n" +
                    "        <input type=\"text\" class=\"bodyImageName\" value=\"" + mytbody.photo + "\" style=\"display: none\">\n" +
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
                if (newContact) {
                    $('.mytable').append(template);
                } else {
                    let arr3 = $('#mytbody' + mytbody.id).find('.mytr input');
                    let arr4 = [mytbody.id, mytbody.first_name, mytbody.last_name, mytbody.phone, mytbody.email, mytbody.photo];

                    $.each(arr3, function (index, elem) {
                        $($(elem)).val(arr4[index])
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
        var i_path = $(this).attr('src');
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

    $(document).on('click', '.myth', function (event) {
        let upJQObject = $($(event.target.closest('.myth')).find('.fa-sort-up').get(0));
        let downJQObject = $($(event.target.closest('.myth')).find('.fa-sort-down').get(0));
        let order = 'asc';

        //Условие, все поля кроме фото и кнопок
        if (typeof upJQObject.get(0) !== "undefined") {
            if (downJQObject.attr('hidden') === 'hidden') {
                //Если вниз не видна, то показываем
                removeAllSortArrow(event);

                downJQObject.removeAttr('hidden');//Показываем вниз
                upJQObject.attr('hidden', true);//Скрываем вверх

                order = 'desc'
            } else {
                //иначе показываем вверх и вниз скрываем
                removeAllSortArrow(event)

                upJQObject.removeAttr('hidden');//Показываем вверх
                downJQObject.attr('hidden', true);//скрываем вниз

                order = 'asc'
            }
            $(event.target.closest('.myth')).addClass('active');
            document.querySelector('.active').setAttribute('data-order', order);
            let dataAttrib = document.querySelector('.active').getAttribute('data-field');
            let elements = $('.' + dataAttrib);
            let tmp = [];
            let tmp2 = [];
            $(elements).each(function (index, value) {
                tmp[index] = replaceOnNumber(String($(value).find('input').val()));
            })
            // console.log(tmp)
            // tmp.forEach(function (key, value, tmp) {
            // arr1 = temp1.trim().split(" ");
            // arr2 = temp2.trim().split(" ");
            // let min
            // if (arr1.length < arr2.length) {
            //     min = arr1.length;
            //     arr2 = arr2.slice(1, arr1.length);
            // } else {
            //     min = arr2.length;
            //     arr1 = arr1.slice(1, arr1.length);
            // }
            // for (var i = 0; i < min; i++) {
            //     if (arr1[i] < arr2[i]) {
            //
            //     } else {
            //
            //     }
            // }
            // });
            // tmp.forEach(function (key, value, tmp) {
            //     tmp2[key] = replaceOnNumber(String(value));
            // });

            // arr1 = temp1.trim().split(" ");
            // arr2 = temp2.trim().split(" ");
            // let min
            // if (arr1.length < arr2.length) {
            //     min = arr1.length;
            //     arr2 = arr2.slice(1, arr1.length);
            // } else {
            //     min = arr2.length;
            //     arr1 = arr1.slice(1, arr1.length);
            // }
            // for (var i = 0; i < min; i++) {
            //     if (arr1[i] < arr2[i]) {
            //
            //     } else {
            //
            //     }
            // }


            sortBodyElements(order, elements);
            // let result = sortOnPHP(elements, order);
        }
    });

    sortBodyElements();
});

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

// Сохранение картинки в форме (это не загрузка на сервер)
function save() {
    let f = file1.files[0];
    if (f) {
        modalImage.src = URL.createObjectURL(f);
        localStorage.setItem('myImage', modalImage.src);
    }
}

//Кнопка удалить картинку
function remImg() {
    let blockPhoto = $('.blockPhoto');
    blockPhoto.find('#file1').val('');
    blockPhoto.find('#modalImage').attr('src', '/uploads/no_photo.jpg');
}

//Сортировка элементов
function sortBodyElements(order = 'asc', elements = '') {
    var result = $('.mytbody').sort(
        function (a, b) {
            var contentA = parseInt($(a).data('sort'));
            var contentB = parseInt($(b).data('sort'));
            if (order === 'asc') {
                return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
            }
            if (order === 'desc') {
                return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0;
            }
        }
    );
    $('.dinamicalBody').html(result);
}

function sortOnPHP(arr = [], order = 'asc') {
    var data = new FormData();
    data.append('sort', true);
    data.append('order', order);
    data.append('order', order);
    $.ajax({
        type: 'POST',
        data: data,
        contentType: false,
        cache: false,
        processData: false,
        success: function (response) {
            let mytbody = $.parseJSON(response);
            let template = "<div data-sort=\"" + mytbody.id + "\" class=\"row mytbody\" id=\"mytbody" + mytbody.id + "\">\n" +
                "    <div class=\"col-sm mytr trid\" hidden>\n" +
                "        <input type=\"text\" value=\"" + mytbody.id + "\">\n" +
                "    </div>\n" +
                "    <div class=\"col-sm mytr trfirstname\">\n" +
                "        <input type=\"text\" value=\"" + mytbody.first_name + "\" readonly>\n" +
                "    </div>\n" +
                "    <div class=\"col-sm mytr trlast_name\">\n" +
                "        <input type=\"text\" value=\"" + mytbody.last_name + "\" readonly>\n" +
                "    </div>\n" +
                "    <div class=\"col-sm mytr trphone\">\n" +
                "        <input type=\"text\" value=\"" + mytbody.phone + "\" readonly>\n" +
                "    </div>\n" +
                "    <div class=\"col-sm mytr tremail\">\n" +
                "        <input type=\"text\" value=\"" + mytbody.email + "\" readonly>\n" +
                "    </div>\n" +
                "    <div class=\"col-sm mytr trphoto\">\n" +
                "        <input type=\"text\" class=\"bodyImageName\" value=\"" + mytbody.photo + "\" style=\"display: none\">\n" +
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
        }
    });
}

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

function arrayFlip(arr, inc = false) {
    let exceptions = ['.', '@', '!', '#', '$', '%', '^', "&", '*', '(', ')', '`', '~', '№', ';', ':', '?'];
    let key;
    let val;
    let tmpArr = [];
    let i = 0;
    for (key in arr) {
        val = arr[key];

        if (isNumber(key) > 0) {
            key = Number(key)
        } else {
            key = String(key)
        }
        if (isNumber(val) > 0) {
            val = Number(val)
        } else {
            val = String(val)
        }

        if (exceptions.indexOf(val) === 0) {
            break;
        }
        if (tmpArr.indexOf(val) === -1) {
            if (inc) {
                tmpArr[val] = key + 1;
                tmpArr.length++;
            } else {
                tmpArr[val] = key;
                tmpArr.length++;
            }
            i++;
        } else {
            break;
        }
    }
    return tmpArr;
}
function isNumber(num) {
    let result = [];
    num = String(num);
    result = num.match(/(\d+)/g);
    return (result !== null) ? result.length : 0;
}
function bubbleSort(arr) {
    let sorted = false;
    let temp;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = false;
            }
        }
    }
    return arr;
}

function replaceOnNumber(str) {
    str = str.toLowerCase();
    let templateRus = arrayFlip(genCharArray('а', 'я'), true);
    let templateEng = arrayFlip(genCharArray('a', 'z'), true);
    let arr = str.split("");
    let newStr = '';

    arr = arrayFlip(arr);
    arr = arraySortValue(arr);
    arr = bubbleSort(arr);


    arr.forEach(function (key, value, arr) {
        if (getKey(templateRus[key]) === key) {
            newStr = newStr + ' ' + templateRus[key];
        }
        if (getKey(templateEng[key]) === key) {
            newStr = newStr + ' ' + templateEng[key];
        }
    });

    return newStr;
}

function arraySortValue(arr) {
    let i = 0;
    let minNum = -1;
    let minLet = '';
    let tmpArr = [];
    let key; //key => Буквы, arr[key] => цифры

    while (arr.length >= tmpArr.length) {
        for (key in arr) {
            if (i === 0) {
                minNum = arr[key]; //Число
                minLet = key; //Буква
            } else {
                if (arr[key] < minNum) {
                    minNum = arr[key];
                    minLet = key;
                }
            }
            i++;
        }

        tmpArr[minLet] = minNum;
        tmpArr.length++;

        arr = arrayFlip(arr);
        let index = arr.indexOf(minNum);
        if (index !== -1) arr.splice(index, 1);
        arr = arrayFlip(arr);
    }
    return tmpArr;
}

function getKey(value) {
    for (var key in this) {
        if (this[key] == value) {
            return key;
        }
    }
    return null;
}
