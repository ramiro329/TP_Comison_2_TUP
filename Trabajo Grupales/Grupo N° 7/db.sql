use peluqueria;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100)
);

CREATE TABLE servicios (
  id INT AUTO_INCREMENT PRIMARY KEY,  
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL
);

CREATE TABLE turnos (
  id INT AUTO_INCREMENT PRIMARY KEY,  
  idCliente INT NOT NULL,
  idServicio INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  FOREIGN KEY (idCliente) REFERENCES clientes(id),  
  FOREIGN KEY (idServicio) REFERENCES servicios(id) 
);