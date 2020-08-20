# phone-book

Тестовое задание PHP+MySQL+Ajax
Программа - "Телефонная книга".
Задача:
Организовать телефонную книгу для пользователей. Любой желающий может зарегистрироваться и создать себе телефонную книгу.
Организовать авторизацию; загрузку файлов jpg, png; редактирование и отображение информации.
Страницы:
Страница авторизации
Страница регистрации (Требования к логину: только латинские буквы и цифры. Проверка почты на правильность. Требование к паролю: должен содержать и цифры, и буквы.) 
Страница работы с книгой (все операции без перезагрузки страницы, с помощью ajax)
Таблицы:
Таблица пользователей, поля: логин, пароль и т.д.
Таблица с записями книги: данные записей (Имя, Фамилия, телефон, email, фото-записи и т.д….)
Функции:
Авторизация
Добавление новой записи и загрузка к ней картинки
Редактирование существующих записей
Отображение, как общего списка, так и отдельных записей, сортировка списка
создать функцию, которая переводила бы цифровое обозначение цифр в буквенное до числа 999 999999999, например, 21125 => 'двадцать одна тысяча сто двадцать пять'. Применить ее к отображению телефонного номера в отдельных записях
Выход
Условия:
Версия PHP 5.5.38
Не использовать фреймворки и библиотеки PHP
Использовать 
JQuery
Создать простой класс Db (singleton) с использованием PDO для обращений к базе MySQL
MVC-подход (разделение как минимум на контроллер и представление)
Для форм авторизации и регистрации проверка Captcha
В качестве основы для оформления использовать Bootstrap http://getbootstrap.com/
обязательная проверка полей со стороны клиента и сервера
Файл картинки не более 2Mb, только jpg, png
Результат задания:
Файл db-structure.sql
PHP файлы
Сколько времени было потрачено на выполнение задания?


CREATE TABLE `book` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`last_name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`phone` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`email` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`photo` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`user_id` INT(11) NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `user_id` (`user_id`) USING BTREE,
	CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `phone_book`.`users` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=11
;


CREATE TABLE `users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`login` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`pass` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=20
;


CREATE TABLE `system` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`key` VARCHAR(255) NOT NULL DEFAULT '' COLLATE 'utf8mb4_unicode_ci',
	`value` VARCHAR(255) NOT NULL DEFAULT '' COLLATE 'utf8mb4_unicode_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=3
;

Добавить в таблицу систем 2 строки:
1) "ключ" = recaptcha_site_key, "значение" = "ваш уникальный ключ сайта"
2) "ключ" = recaptcha_secret_key, "значение" = "ваш уникальный секретный ключ"

Ключи нужно сгенерировать в вашем личном кабинете google https://www.google.com/u/1/recaptcha/admin/create. 
Для этого нужен аккаунт гугл. Если у вас его нет, то необходимо зарегистрироваться.
