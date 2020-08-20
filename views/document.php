<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>PhoneBook</title>
    <meta name="description" content="HTML5">
    <meta name="author" content="PhoneBook">

    <link rel="stylesheet" href="/lib/bootstrap-4.1.3-dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/css/styles.css?<?=time()?>">
    <link href="/lib/fontawesome-free-5.14.0-web/css/all.css" rel="stylesheet">

    <link href="/lib/fontawesome-free-5.14.0-web/css/fontawesome.css" rel="stylesheet">
    <link href="/lib/fontawesome-free-5.14.0-web/css/brands.css" rel="stylesheet">
    <link href="/lib/fontawesome-free-5.14.0-web/css/solid.css" rel="stylesheet">

</head>
<body>

<div id="document">
    <div class="authreg">
        <?
        if ($register && !$auth) {
            include('register.php');
        }
        if ($auth && !$register) {
            include('auth.php');
        }
        ?>
    </div>
    <div class="book">
        <?
        if ($book) {
            include('book.php');
        }
        ?>
    </div>
</div>

<script src="/lib/rubles.js"></script>
<script src="/js/jquery351.js"></script>
<script src="/lib/maskedinput/src/jquery.maskedinput.js"></script>
<script src="/lib/inputmask.js"></script>
<script src="/lib/bootstrap-4.1.3-dist/js/popper.min.js"></script>
<script src="/lib/bootstrap-4.1.3-dist/js/bootstrap.js"></script>
<script type="application/javascript" src="/js/main.js?<?=time()?>"></script>
<script defer src="/lib/fontawesome-free-5.14.0-web/js/all.js"></script>
<script defer src="/lib/fontawesome-free-5.14.0-web/js/brands.js"></script>
<script defer src="/lib/fontawesome-free-5.14.0-web/js/solid.js"></script>
<script defer src="/lib/fontawesome-free-5.14.0-web/js/fontawesome.js"></script>

</body>
</html>
