-- Полный список товаров
select
  tl.id, 
  tl.id_magazine, 
  m.descr,
  m.adresphone,
  tl.id_tovar,
  t.descr,
  t.price
from 
  mgz_tovar_list tl 
  left outer join mgz_tovar t
  on tl.id_tovar = t.id
  left outer join mgz_magazine m 
  on tl.id_magazine = m.id
order by tl.id;
  


-- Расшифровка чека покупки
select 
  ch.id, 
  ch.id_pokupki,
  p.id_client, 
  c.fio,
  p.id_magazine, 
  m.descr as descr_magaine,
  m.adresphone,
  p.data_pokupki,
  ch.id_tovar, 
  t.descr as descr_tovara,
  t.price,
  ch.kolichestvo
from 
  mgz_check ch 
  left outer join mgz_tovar t
  on ch.id_tovar = t.id
  left outer join mgz_pokupki p
  on ch.id_pokupki = p.id
  left outer join mgz_client c
  on p.id_client = c.id
  left outer join mgz_magazine m
  on p.id_magazine = m.id
order by ch.id;





-- Расшифровка чека покупки (только описание)
select 
  ch.id, 
  c.fio,  
  m.descr as descr_magaine,
  m.adresphone,
  p.data_pokupki,
  t.descr as descr_tovara,
  t.price,
  ch.kolichestvo
from 
  mgz_check ch 
  left outer join mgz_tovar t
  on ch.id_tovar = t.id
  left outer join mgz_pokupki p
  on ch.id_pokupki = p.id
  left outer join mgz_client c
  on p.id_client = c.id
  left outer join mgz_magazine m
  on p.id_magazine = m.id
order by ch.id;



-- Самый щедрый клиент
select
  c.fio,
  sum(ch.kolichestvo * t.price) as summa
from
  mgz_client c
  right outer join mgz_pokupki p
  on c.id = p.id_client
  right outer join mgz_check ch
  on p.id = ch.id_pokupki
  left outer join mgz_tovar t
  on ch.id_tovar = t.id
group by c.fio
order by summa desc;



-- Какой доход мы получили от каждого товара?
select
  t.id,
  t.descr,
  t.price,  
  (select sum(c.kolichestvo) 
  from mgz_check c 
  where c.id_tovar = t.id)
  * t.price as summa_dohoda
from mgz_tovar t
order by summa_dohoda desc;


-- Самый рентабельный магазин
select
  m.descr,
  sum(ch.kolichestvo * t.price) as summa
from
  mgz_magazine m right outer join mgz_pokupki p
  on m.id = p.id_magazine
  right outer join mgz_check ch
  on p.id = ch.id_pokupki
  left outer join mgz_tovar t
  on ch.id_tovar = t.id
group by m.descr
order by summa desc;




--------------------------------------------------------------------------------------------  
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------

SET 'mgz_tovar_list_fk1' = 0;
-- нужные изменения - UPDATE/DELETE/ALTER/TRUNCATE;
SET mgz_tovar_list_fk1 = 1;


update mgz_tovar_list
set id_tovar = null
where id = 8;

--------------------------------------------------------------------------------------------

create table tmp_tovar as
select id, descr, price
from mgz_tovar

create table tmp_magazine as
select id, descr, adresphone
from mgz_magazine

create table tmp_tovar_list as
select id, id_magazine, id_tovar
from mgz_tovar_list

--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------

select * from tmp_tovar_list;

select
  tl.id, 
  tl.id_magazine, 
  m.descr,
  m.adresphone,
  tl.id_tovar,
  t.descr,
  t.price
from 
  tmp_tovar_list tl 
  left outer join tmp_tovar t
  on tl.id_tovar = t.id
  left outer join tmp_magazine m 
  on tl.id_magazine = m.id;


-- id_magazine = 4
update tmp_tovar_list
set id_magazine = 4
where id =8;

-- id_tovara = 4
update tmp_tovar_list
set id_tovar = 4
where id =8;