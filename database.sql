use td_list_test;
DROP TABLE tdList;
CREATE TABLE tdList(
id integer primary key not  NULL AUTO_INCREMENT,
content varchar(400),
username varchar(400),
date varchar(500));

insert into tdList VALUES (1,'erzg', 'username', 'fageg');

select * from tdList;