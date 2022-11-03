USE market_flutter;

CREATE TABLE users(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL UNIQUE,
    name VARCHAR(90) NOT NULL,
    phone VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(90),
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(180) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    update_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(
	name,
    route,
    created_at,
    update_at
)
VALUES(
	'RESTAURANTE',
    '/restaurant/orders/list',
    '2022-06-1',
    '2022-06-1'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    update_at
)
VALUES(
	'REPARTIDOR',
    '/delivery/orders/list',
    '2022-06-1',
    '2022-06-1'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    update_at
)
VALUES(
	'CLIENTE',
    '/client/products/list',
    '2022-06-1',
    '2022-06-1'
);

CREATE TABLE user_has_roles(
	id_user BIGINT,
	id_rol BIGINT,
    created_at TIMESTAMP(0) NOT NULL,
    update_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)
);

CREATE TABLE categories(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);