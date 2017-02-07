CREATE TABLE mgz_test (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30),
age INT(10),
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


insert into mgz_test(age)
values(10);


insert into mgz_test(firstname)
values('Тестировка');
