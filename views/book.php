<div class="phone">
    <div class="container exit">
        <div class="userName"><?= $userName ?></div>
        <p>
            <a href="/logout/" style="float: right">
                <span style="font-size: 25px; vertical-align: bottom;">Выйти</span>
                <i class="fas fa-sign-out-alt" style="font-size: 25px"></i>
            </a>.
        </p>
    </div>
    <hr>
    <br>

    <div class="container">
        <div class="row mythead">
            <div class="col-sm myth">
                №
            </div>
            <div class="col-sm myth">
                Имя
            </div>
            <div class="col-sm myth">
                Фамилия
            </div>
            <div class="col-sm myth">
                Телефон
            </div>
            <div class="col-sm myth">
                Email
            </div>
            <div class="col-sm myth">
                Фото-записи
            </div>
        </div>
        <?include('mytbody.php');?>
    </div>
</div>
