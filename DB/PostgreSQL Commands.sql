CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50),
    email_address varchar(50) UNIQUE,
    phone_number varchar(50),
    shipping_address varchar(255)
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    payment_amount decimal(10,2),
    payment_timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
    payment_status varchar(50)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id integer REFERENCES customers(customer_id),
    payment_id integer REFERENCES payments(payment_id),
    order_timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
    order_status varchar(50)
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name varchar(50)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    category_id integer REFERENCES categories(category_id),
    product_name varchar(50),
    product_price decimal(10,2),
    product_description varchar(255),
    product_available boolean
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(order_id),
    product_id integer REFERENCES products(product_id),
    items_quantity integer,
    order_price decimal(10,2)
);

-- Insertar datos en la tabla `customers`
INSERT INTO customers (first_name, last_name, email_address, phone_number, shipping_address)
VALUES 
    ('Juan', 'Pérez', 'juan.perez@email.com', '3001234567', 'Calle 123, Bogotá'),
    ('Ana', 'Gómez', 'ana.gomez@email.com', '3102345678', 'Avenida 456, Medellín'),
    ('Carlos', 'Martínez', 'carlos.martinez@email.com', '3203456789', 'Carrera 789, Cali');

-- Insertar datos en la tabla `payments`
INSERT INTO payments (payment_amount, payment_timestamp, payment_status)
VALUES 
    (150.75, '2024-11-07 10:00:00', 'Completed'),
    (200.50, '2024-11-07 11:00:00', 'Pending'),
    (75.00, '2024-11-07 12:00:00', 'Completed');

-- Insertar datos en la tabla `orders`
INSERT INTO orders (customer_id, payment_id, order_timestamp, order_status)
VALUES 
    (1, 1, '2024-11-07 10:00:00', 'Shipped'),
    (2, 2, '2024-11-07 11:00:00', 'Processing'),
    (3, 3, '2024-11-07 12:00:00', 'Delivered');

-- Insertar datos en la tabla `categories`
INSERT INTO categories (category_name)
VALUES 
    ('Electronics'),
    ('Clothing'),
    ('Home & Kitchen');

-- Insertar datos en la tabla `products`
INSERT INTO products (category_id, product_name, product_price, product_description, product_available)
VALUES 
    (1, 'Smartphone', 500.00, 'Smartphone with 64GB storage', TRUE),
    (2, 'T-Shirt', 20.00, 'Cotton T-Shirt, various sizes', TRUE),
    (3, 'Blender', 60.00, 'High-speed blender for smoothies', FALSE);

-- Insertar datos en la tabla `order_items`
INSERT INTO order_items (order_id, product_id, items_quantity, order_price)
VALUES 
    (1, 1, 1, 500.00),   -- Pedido 1, Producto 1 (Smartphone)
    (2, 2, 2, 40.00),    -- Pedido 2, Producto 2 (T-Shirt)
    (3, 3, 1, 60.00);    -- Pedido 3, Producto 3 (Blender)

-- Insertar datos adicionales en la tabla `customers`
INSERT INTO customers (first_name, last_name, email_address, phone_number, shipping_address)
VALUES 
    ('Laura', 'Hernández', 'laura.hernandez@email.com', '3109876543', 'Carrera 101, Bogotá'),
    ('Miguel', 'Torres', 'miguel.torres@email.com', '3208765432', 'Calle 202, Medellín'),
    ('Sofía', 'López', 'sofia.lopez@email.com', '3007654321', 'Avenida 303, Cali');

-- Insertar datos adicionales en la tabla `payments`
INSERT INTO payments (payment_amount, payment_timestamp, payment_status)
VALUES 
    (300.00, '2024-11-07 13:00:00', 'Completed'),
    (120.25, '2024-11-07 14:00:00', 'Pending'),
    (89.99, '2024-11-07 15:00:00', 'Failed');

-- Insertar datos adicionales en la tabla `orders`
INSERT INTO orders (customer_id, payment_id, order_timestamp, order_status)
VALUES 
    (4, 4, '2024-11-07 13:00:00', 'Shipped'),
    (5, 5, '2024-11-07 14:00:00', 'Processing'),
    (6, 6, '2024-11-07 15:00:00', 'Cancelled');

-- Insertar datos adicionales en la tabla `categories`
INSERT INTO categories (category_name)
VALUES 
    ('Sports'),
    ('Beauty'),
    ('Books');

-- Insertar datos adicionales en la tabla `products`
INSERT INTO products (category_id, product_name, product_price, product_description, product_available)
VALUES 
    (4, 'Tennis Racket', 50.00, 'Professional tennis racket', TRUE),
    (5, 'Lipstick', 15.00, 'Red lipstick, long-lasting', TRUE),
    (6, 'Novel', 10.00, 'Best-selling novel', TRUE);

-- Insertar datos adicionales en la tabla `order_items`
INSERT INTO order_items (order_id, product_id, items_quantity, order_price)
VALUES 
    (4, 4, 1, 50.00),   -- Pedido 4, Producto 4 (Tennis Racket)
    (5, 5, 3, 45.00),   -- Pedido 5, Producto 5 (Lipstick)
    (6, 6, 1, 10.00);   -- Pedido 6, Producto 6 (Novel)
