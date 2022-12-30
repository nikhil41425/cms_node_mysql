

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

create table product(
 id int not null auto_increment,
 name varchar(255) not null,
 categoryId int not null,
 description varchar(255),
 price int,
 status varchar(20),
 primary key(id)
);

create table bill(
    id int not null auto_increment,
    uuid varchar(200) not null,
    name varchar(200) not null,
    email varchar(200) not null,
    contactNumber varchar(20) not null,
    paymentMethod varchar(50) not null,
    total int not null,
    productDetails JSON DEFAULT null,
    createdBy varchar(200) not null,
    primary key(id)
);