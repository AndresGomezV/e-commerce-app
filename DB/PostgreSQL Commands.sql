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

-- Insertar en Categories
INSERT INTO categories (category_name)
VALUES 
    ('Electronics'),
    ('Clothing'),
    ('Home & Kitchen'),
    ('Sports & Outdoors'),
    ('Books'),
    ('Toys');

-- Insertar en Customers
INSERT INTO customers (first_name, last_name, email_address, phone_number, shipping_address, password, username)
VALUES
    ('Juan', 'Pérez', 'juan.perez@example.com', '3001234567', 'Carrera 5 #20-10, Bogotá, Colombia', 'hashedpassword1', 'juanperez'),
    ('Ana', 'Gómez', 'ana.gomez@example.com', '3002345678', 'Calle 80 #5-30, Medellín, Colombia', 'hashedpassword2', 'anagomez'),
    ('Carlos', 'Martínez', 'carlos.martinez@example.com', '3003456789', 'Avenida 10 #50-60, Cali, Colombia', 'hashedpassword3', 'carlosmartinez'),
    ('Marta', 'Rodríguez', 'marta.rodriguez@example.com', '3004567890', 'Carrera 15 #30-40, Barranquilla, Colombia', 'hashedpassword4', 'martarodriguez'),
    ('Pedro', 'Sánchez', 'pedro.sanchez@example.com', '3005678901', 'Calle 25 #10-20, Cartagena, Colombia', 'hashedpassword5', 'pedrosanchez'),
    ('Laura', 'López', 'laura.lopez@example.com', '3006789012', 'Avenida 50 #25-35, Bucaramanga, Colombia', 'hashedpassword6', 'lauralopez');

-- Insertar en Products
INSERT INTO products (product_name, product_price, product_description, product_available, category_id)
VALUES
    ('Smartphone', 500.00, 'High-end smartphone with 128GB storage', true, 1),
    ('T-Shirt', 20.00, 'Cotton T-shirt, various colors', true, 2),
    ('Coffee Maker', 45.00, 'Automatic coffee maker with programmable settings', true, 3),
    ('Yoga Mat', 25.00, 'Non-slip yoga mat', true, 4),
    ('The Great Gatsby', 15.00, 'Classic novel by F. Scott Fitzgerald', true, 5),
    ('Action Figure', 10.00, 'Collectible superhero action figure', true, 6);

-- Insertar en Orders
INSERT INTO orders (customer_id, order_timestamp, order_status, payment_id)
VALUES
    (1, '2024-11-01 10:00:00', 'Completed', 1),
    (2, '2024-11-02 11:00:00', 'Pending', 2),
    (3, '2024-11-03 12:00:00', 'Shipped', 3),
    (4, '2024-11-04 13:00:00', 'Completed', 4),
    (5, '2024-11-05 14:00:00', 'Cancelled', 5),
    (6, '2024-11-06 15:00:00', 'Shipped', 6);

-- Insertar en Order Items
INSERT INTO order_items (order_id, product_id, items_quantity, order_price)
VALUES
    (1, 1, 1, 500.00),
    (2, 2, 2, 40.00),
    (3, 3, 1, 45.00),
    (4, 4, 1, 25.00),
    (5, 5, 1, 15.00),
    (6, 6, 2, 20.00);

-- Insertar en Payments
INSERT INTO payments (payment_method, payment_amount, payment_timestamp, payment_status)
VALUES
    ('Credit Card', 500.00, '2024-11-01 10:05:00', 'Completed'),
    ('PayPal', 40.00, '2024-11-02 11:10:00', 'Pending'),
    ('Credit Card', 45.00, '2024-11-03 12:15:00', 'Completed'),
    ('Bank Transfer', 25.00, '2024-11-04 13:20:00', 'Completed'),
    ('Credit Card', 15.00, '2024-11-05 14:25:00', 'Cancelled'),
    ('PayPal', 20.00, '2024-11-06 15:30:00', 'Completed');
