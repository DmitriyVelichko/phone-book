<div id="myModal">
    <p>Добавить контакт</p>
    <span id="myModal__close" class="close">ₓ</span>

    <form action="?" method="post" enctype="multipart/form-data">
        <div class="row">
            <div class="col-sm">
                <label for="first_name">Имя</label>
            </div>
            <div class="col-sm">
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
                <input type="text" id="phone" name="phone" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <label for="email">Email</label>
            </div>
            <div class="col-sm">
                <input type="text" id="email" name="email" value="">
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
                    <input type="file" id="file1" name="files[]" style="display: none;" multiple />
                    <div onclick="save()" id="lblloadphoto">Загрузить</div>
                    <img id="image1" width="310px" height="180px" />
                </div>
        </div>

        <div class="row">
            <div class="col-sm">
                <input type="hidden" id="insContact" name="insContact" value="1">
                <input type="submit" id="addContact" name="addContact" value="Добавить">
            </div>
        </div>

    </form>
</div>