<div id="myModal">
    <p>Добавить контакт</p>
    <span id="myModal__close" class="close">ₓ</span>

    <form action="?" method="post" enctype="multipart/form-data" id="modalAddContact">
        <div class="row">
            <div class="col-sm">
                <label for="first_name">Имя</label>
            </div>
            <div class="col-sm">
                <input type="text" id="id" name="id" value="" style="display: none">
                <input type="text" id="first_name" name="first_name" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <label for="last_name">Фамилия</label>
            </div>
            <div class="col-sm">
                <input type="text" id="last_name" name="last_name" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <label for="phone">Телефон</label>
            </div>
            <div class="col-sm">
                <input type="tel" id="phone" name="phone" value="" pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" placeholder="+7(___)-___-__-__">
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <label for="email">Email</label>
            </div>
            <div class="col-sm">
                <input type="text" id="email" name="email" value="" placeholder="user777@test.ru">
            </div>
        </div>

        <div class="row">
            <div class="col-sm">
                <span>Фото</span>
            </div>
        </div>
        <div class="row blockPhoto">
                <div class="col-sm photomarg">
                    <label for="file1" id="lblphoto">Выбрать файл</label>
                    <input type="file" id="file1" name="files[]" accept="image/x-png,image/jpeg" value="" multiple hidden onchange="autoloadimg()"/>
                    <div id="lblremphoto">Удалить</div>
                    <img id="modalImage" src="/uploads/no_photo.jpg"/>
                </div>
        </div>

        <div class="row">
            <div class="col-sm">
                <input type="hidden" id="insContact" name="insContact" value="1">
                <input type="submit" id="addContact" name="addContact" value="Сохранить">
            </div>
        </div>

    </form>
</div>