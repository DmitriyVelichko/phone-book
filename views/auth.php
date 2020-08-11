<div class="auth">
    <form action="?" method="post" id="auth">
        <div class="container">
            <h1>Авторизация:</h1>
            <hr>

            <label for="login"><b>Логин</b></label>
            <input type="text" placeholder="user777@test.ru" name="login" pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$" required>
            <a class="question" data-tooltip="Используйте только латинские буквы и цифры, при вводе email.">
                <i class="far fa-question-circle"></i>
            </a>
            <label for="pass"><b>Пароль</b></label>
            <input type="password" placeholder="pasSword777" name="pass" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}" required>
            <a class="question" data-tooltip="Пароль должен состоять из латинских букв. Включать в себя заглавные, строчные буквы и цифры. Длина пароля от 6 до 20 символов.">
                <i class="far fa-question-circle"></i>
            </a>
            <hr>
            <div class="error" hidden><?= $error ?></div>

            <button type="submit" class="authbtn">Войти</button>
        </div>

        <div class="container signup">
            <p>У вас еще нет аккаунта? <a href="/register/">Зарегистрироваться</a>.</p>
        </div>
    </form>
</div>