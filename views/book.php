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
                <div class="col-sm myth" data-field="trid" style="max-width: 71px">
                    №
                    <i class="fas fa-sort"></i>
                    <i class="fas fa-sort-up" hidden></i>
                    <i class="fas fa-sort-down" hidden></i>
                </div>
                <div class="col-sm myth" data-field="trfirstname">
                    Имя
                    <i class="fas fa-sort"></i>
                    <i class="fas fa-sort-up" hidden></i>
                    <i class="fas fa-sort-down" hidden></i>
                </div>
                <div class="col-sm myth" data-field="trlastname">
                    Фамилия
                    <i class="fas fa-sort"></i>
                    <i class="fas fa-sort-up" hidden></i>
                    <i class="fas fa-sort-down" hidden></i>
                </div>
                <div class="col-sm myth" data-field="trphone">
                    Телефон
                    <i class="fas fa-sort"></i>
                    <i class="fas fa-sort-up" hidden></i>
                    <i class="fas fa-sort-down" hidden></i>
                </div>
                <div class="col-sm myth" data-field="tremail">
                    Email
                    <i class="fas fa-sort"></i>
                    <i class="fas fa-sort-up" hidden></i>
                    <i class="fas fa-sort-down" hidden></i>
                </div>
                <div class="col-sm myth" data-field="trphoto">
                    Фото-записи
                </div>
                <div class="col-sm myth" data-field="trbuttons">
                    Редактировать
                </div>
            </div>
            <div class="dinamicalBody">
                <?
                if(!empty($content)) {
                    include('mytbody.php');
                }
                ?>
            </div>
        </div>
    </div>
</div>
