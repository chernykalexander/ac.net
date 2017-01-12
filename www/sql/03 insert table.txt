-- Справочник товаров
-- mgz_tovar
insert into mgz_tovar(descr, price)
values ("Молоко", 15);

insert into mgz_tovar(descr, price)
values ("Мясо", 42);

insert into mgz_tovar(descr, price)
values ("Рис", 10);

insert into mgz_tovar(descr, price)
values ("Яблоко", 5);


-- Покупатели
-- mgz_client
insert into mgz_client(fio)
values("Ларин Михаил Иванович");

insert into mgz_client(fio)
values("Травников Евгений Петрович");

insert into mgz_client(fio)
values("Яковлев Михаил Степанович");

insert into mgz_client(fio)
values("Ревазов Жорик Егорович");


-- Магазиы
-- mgz_magazine
insert into mgz_magazine(descr, adresphone)
values ("ХозТовары", "ул. Набережная 155");

insert into mgz_magazine(descr, adresphone)
values ("ПромТовары", "ул. Тенистая 52");

insert into mgz_magazine(descr, adresphone)
values ("БытТовары", "ул. Минская 60");

insert into mgz_magazine(descr, adresphone)
values ("СпортТовары", "ул. Степная 17");



-- Список товаров
-- mgz_tovar_list
insert into mgz_tovar_list(id_magazine, id_tovar)
values(1, 1);

insert into mgz_tovar_list(id_magazine, id_tovar)
values(1, 2);


insert into mgz_tovar_list(id_magazine, id_tovar)
values(2, 3);

insert into mgz_tovar_list(id_magazine, id_tovar)
values(2, 4);



insert into mgz_tovar_list(id_magazine, id_tovar)
values(3, 1);

insert into mgz_tovar_list(id_magazine, id_tovar)
values(3, 2);


insert into mgz_tovar_list(id_magazine, id_tovar)
values(4, 3);

insert into mgz_tovar_list(id_magazine, id_tovar)
values(4, 4);


-- Список покупок
-- mgz_pokupki

insert into mgz_pokupki(id_client, id_magazine)
values(1, 1);


insert into mgz_pokupki(id_client, id_magazine)
values(1, 2);


insert into mgz_pokupki(id_client, id_magazine)
values(2, 1);

insert into mgz_pokupki(id_client, id_magazine)
values(3, 1);

insert into mgz_pokupki(id_client, id_magazine)
values(4, 1);

insert into mgz_pokupki(id_client, id_magazine)
values(4, 2);

insert into mgz_pokupki(id_client, id_magazine)
values(4, 3);


-- Чек покупки
-- mgz_check
insert into mgz_check(id_pokupki, id_tovar, kolichestvo)
values (1, 1, 1);

insert into mgz_check(id_pokupki, id_tovar, kolichestvo)
values (2, 2, 1);

insert into mgz_check(id_pokupki, id_tovar, kolichestvo)
values (3, 3, 1);

insert into mgz_check(id_pokupki, id_tovar, kolichestvo)
values (4, 4, 1);

insert into mgz_check(id_pokupki, id_tovar, kolichestvo)
values (5, 1, 1);

insert into mgz_check(id_pokupki, id_tovar, kolichestvo)
values (6, 2, 1);

insert into mgz_check(id_pokupki, id_tovar, kolichestvo)
values (7, 3, 1);
