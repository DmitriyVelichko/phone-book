<? foreach ($content as $key => $item) {?>
<div class="row mytbody" id="mytbody<?=$item['id']?>" data-sort="<?=$item['id']?>">
    <div class="col-sm mytr trid" hidden>
        <input type="text" value="<?=$item['id']?>">
    </div>
    <div class="col-sm mytr trfirstname">
        <input type="text" value="<?=$item['first_name']?>" readonly>
    </div>
    <div class="col-sm mytr trlastname">
        <input type="text" value="<?=$item['last_name']?>" readonly>
    </div>
    <div class="col-sm mytr trphone">
        <input type="text" value="<?=$item['phone']?>" readonly>
    </div>
    <div class="col-sm mytr tremail">
        <input type="text" value="<?=$item['email']?>" readonly>
    </div>
    <div class="col-sm mytr trphoto">
        <input type="text" class="bodyImageName" value="<?=$item['photo']?>" style="display: none">
        <div class="image__wrapper">
            <img <?if(!empty($item['photo'])):?>
                    src="/uploads/<?=$item['photo']?>"
                <?else:?>
                    src="/uploads/no_photo.jpg"
                    style="width: 1px; height: 1px;"
                <?endif;?>
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
<? } ?>
