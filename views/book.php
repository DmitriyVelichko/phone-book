<div class="phone">
    <div class="container">
        <div class="row container">
            <div class="userName"><?= $userName ?></div>
        </div>
        <div class="row container exit">
            <div class="col-sm">
                <div class="showhim myLinkModal addPhone">
                    <div class="showme"><i class="fas fa-user-check"></i></div>
                    <div class="ok"><i class="fas fa-user-plus"></i></div>
                </div>
                <?include('addContact.php');?>
                <div id="myOverlay"></div>
                <div class="showhim linklogout" data-href="/logout/">
                    <div class="showme"><i class="fas fa-door-open"></i></div>
                    <div class="ok"><i class="fas fa-door-closed"></i></div>
                </div>
            </div>
        </div>

        <div class="mytable">
            <div class="row mythead">
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
                <div class="col-sm myth">
                    Редактировать
                </div>
            </div>
            <?
            if(!empty($content)) {
                include('mytbody.php');
            }
            ?>
        </div>
    </div>
</div>
