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