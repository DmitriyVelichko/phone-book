<? foreach ($content as $key => $item) {?>
<div class="row mytbody">
    <div class="col-sm mytr">
        <?=$item['first_name']?>
    </div>
    <div class="col-sm mytr">
        <?=$item['last_name']?>
    </div>
    <div class="col-sm mytr">
        <?=$item['phone']?>
    </div>
    <div class="col-sm mytr">
        <?=$item['email']?>
    </div>
    <div class="col-sm mytr">
        <div class="image__wrapper">
            <img id="image2" src="/uploads/<?=$item['photo']?>" class="minimized" alt="клик для увеличения"/>
        </div>
    </div>
    <div class="col-sm mytr">
        <div class="showhim" data-itemid="<?=$item['id']?>" id="tbodyedit">
            <div class="showme"><i class="far fa-edit"></i></div>
            <div class="ok"><i class="fas fa-edit"></i></div>
        </div>
        <div class="showhim" data-itemid="<?=$item['id']?>" id="tbodytrash">
            <div class="showme"><i class="far fa-trash-alt"></i></div>
            <div class="ok"><i class="fas fa-trash-alt"></i></div>
        </div>
    </div>
</div>
<? } ?>
