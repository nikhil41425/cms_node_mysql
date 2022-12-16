

create table user(
 id int primary key auto_increment,
 name varchar(50),
 email varchar(50),
 mobile varchar(20),
 password varchar(200),
 status varchar(20),
 role varchar(20),
 unique(email)
);

create table category(
 id int not null auto_increment,
 name varchar(200) not null,
 primary key (id)
);