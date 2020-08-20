<div class="register">
    <form action="?" method="post" id="register">
        <div class="container">
            <h1>Регистрация:</h1>
            <p>Пожалуйста, заполните эту форму, чтобы создать учетную запись.</p>
            <hr>

            <label for="login"><b>Логин</b></label>
            <input type="text"
                   id="login"
                   name="login"
                   pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$"
                   placeholder="user777@test.ru"
                   value=""
                   required>
            <a class="question" data-tooltip="Используйте только латинские буквы и цифры, при вводе email.">
                <i class="far fa-question-circle"></i>
            </a>
            <label for="pass"><b>Пароль</b></label>
            <input type="password" placeholder="pasSword777" name="pass" name="pass" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}" required>
            <a class="question" data-tooltip="Пароль должен состоять из латинских букв. Включать в себя заглавные, строчные буквы и цифры. Длина пароля от 6 до 20 символов.">
                <i class="far fa-question-circle"></i>
            </a>
            <hr>
            <div class="error" hidden><?= $error ?></div>
            <p>Создавая учетную запись, вы соглашаетесь с нашими условиями и конфиденциальностью.</p>
            <button type="submit" class="registerbtn">Зарегистрироваться</button>

            <div class="g-recaptcha" data-sitekey="<?=$recaptchaSiteKey?>"></div>
            <div class="text-danger" id="recaptchaError"></div>
        </div>

        <div class="container signin">
            <p>У Вас уже есть аккаунт? <a href="/auth/">Войти</a>.</p>
        </div>
    </form>
</div>