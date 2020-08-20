<? $i = 1; ?>
<? foreach ($content as $key => $item) { ?>
    <div class="row mytbody" id="mytbody<?= $item['id'] ?>" data-sort="<?= $item['id'] ?>">
        <div class="col-sm mytr trid" style="max-width: 71px">
            <label for="mytbodyid<?= $item['id'] ?>"><?= $i ?></label>
            <input id="mytbodyid<?= $item['id'] ?>" name="mytbodyid" type="text" value="<?= $item['id'] ?>"readonly hidden>
        </div>
        <div class="col-sm mytr trfirstname">
            <label for="mytbodyfirstname<?= $item['id'] ?>"><?= $item['first_name'] ?></label>
            <input id="mytbodyfirstname<?= $item['id'] ?>" name="mytbodyfirstname" type="text" value="<?= $item['first_name'] ?>" readonly hidden>
        </div>
        <div class="col-sm mytr trlastname">
            <label for="mytbodylastname<?= $item['id'] ?>"><?= $item['last_name'] ?></label>
            <input id="mytbodylastname<?= $item['id'] ?>" name="mytbodylastname" type="text" value="<?= $item['last_name'] ?>" readonly hidden>
        </div>
        <div class="col-sm mytr trphone">
            <div class="helptip" title="Перевод">
                <label for="mytbodyphone<?= $item['id'] ?>"><?= $item['phone'] ?></label>
                <div title="Закрыть" class="mytbodyphonedescription"></div>
            </div>
            <input id="mytbodyphone<?= $item['id'] ?>" name="mytbodyphone" type="text" value="<?= $item['phone'] ?>" readonly hidden>
        </div>
        <div class="col-sm mytr tremail">
            <label for="mytbodyemail<?= $item['id'] ?>"><?= $item['email'] ?></label>
            <input id="mytbodyemail<?= $item['id'] ?>" name="mytbodyemail" type="text" value="<?= $item['email'] ?>" readonly hidden>
        </div>
        <div class="col-sm mytr trphoto">
            <input id="mytbodyimagename<?= $item['id'] ?>" name="mytbodyimagename" type="text" class="bodyImageName" value="<?= $item['photo'] ?>" readonly hidden>
            <div class="image__wrapper">
                <img <? if (!empty($item['photo'])): ?>
                    src="/uploads/<?= $item['photo'] ?>"
                <? else: ?>
                    src="/uploads/no_photo.jpg"
                    style="width: 1px; height: 1px;"
                <? endif; ?>
                        class="minimized bodyImage"
                />
            </div>
        </div>
        <div class="col-sm mytr trbuttons">
            <div class="tbodyedit showhim">
                <div class="showme"><i class="far fa-edit"></i></div>
                <div class="ok"><i class="fas fa-edit"></i></div>
            </div>
            <div class="showhim tbodytrash">
                <div class="showme"><i class="far fa-trash-alt"></i></div>
                <div class="ok"><i class="fas fa-trash-alt"></i></div>
            </div>
        </div>
    </div>
    <? $i++ ?>
<? } ?>
