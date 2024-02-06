-- Active: 1680612451782@@127.0.0.1@3306
use db_mayoresapp;

CREATE TABLE RegistrationRequests (
    RequestID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    RequestDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
);
CREATE TABLE PasswordResetRequests (
    RequestID INT AUTO_INCREMENT PRIMARY KEY,
    ConfirmationCode VARCHAR(255) NOT NULL,
    NewPassword VARCHAR(255) NOT NULL,
    RequestDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    -- Otros campos que desees agregar.
    IsEmailConfirmed BOOLEAN DEFAULT FALSE
);

CREATE TABLE EmailConfirmationRequests (
    RequestID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ConfirmationCode VARCHAR(255) NOT NULL,
    RequestDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);
CREATE TABLE Consultorios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patologia VARCHAR(255) NOT NULL,
    consultorioNombre VARCHAR(255) NOT NULL,
    medicoNombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Familiares (
    FamiliarID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Email VARCHAR(255),
    UsuarioID INT,
    FOREIGN KEY (UsuarioID) REFERENCES Users(UserID)
);

CREATE TABLE NewPasswords (
    RequestID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    NewPassword VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

CREATE TABLE Farmacias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);
CREATE TABLE Usuarios_Farmacias (
    UsuarioID INT,
    FarmaciaID INT,
    PRIMARY KEY (UsuarioID, FarmaciaID),
    FOREIGN KEY (UsuarioID) REFERENCES Users(UserID),
    FOREIGN KEY (FarmaciaID) REFERENCES Farmacias(id)
);
DELIMITER //
CREATE PROCEDURE sp_CreateNewUser(
    IN p_Username VARCHAR(255),
    IN p_Email VARCHAR(255),
    IN p_Password VARCHAR(255),
    IN p_GenerateEmailConfirmation BOOLEAN
)
BEGIN
    INSERT INTO Users (Username, Email, Password)
    VALUES (p_Username, p_Email, p_Password);
    
    IF p_GenerateEmailConfirmation THEN
        INSERT INTO EmailConfirmationRequests (UserID, ConfirmationCode)
        VALUES ((SELECT UserID FROM Users WHERE Email = p_Email), CONCAT('CONF_CODE_', UUID()));
    END IF;
END //
DELIMITER ;
DELIMITER //
CREATE PROCEDURE sp_ResetUserPassword(
    IN p_UserID INT,
    IN p_NewPassword VARCHAR(255),
    IN p_UseNewPasswordsTable BOOLEAN
)
BEGIN
    IF p_UseNewPasswordsTable THEN
        INSERT INTO NewPasswords (UserID, NewPassword)
        VALUES (p_UserID, p_NewPassword);
    ELSE
        INSERT INTO PasswordResetRequests (UserID, ConfirmationCode, NewPassword)
        VALUES (p_UserID, CONCAT('RESET_CODE_', UUID()), p_NewPassword);
    END IF;
END //
DELIMITER ;
DELIMITER //
CREATE PROCEDURE sp_ResetUserPassword(
    IN p_UserID INT,
    IN p_NewPassword VARCHAR(255),
    IN p_UseNewPasswordsTable BOOLEAN
)
BEGIN
    IF p_UseNewPasswordsTable THEN
        INSERT INTO NewPasswords (UserID, NewPassword)
        VALUES (p_UserID, p_NewPassword);
    ELSE
        INSERT INTO PasswordResetRequests (UserID, ConfirmationCode, NewPassword)
        VALUES (p_UserID, CONCAT('RESET_CODE_', UUID()), p_NewPassword);
    END IF;
END //
DELIMITER ;
INSERT INTO Consultorios (patologia, consultorioNombre, medicoNombre, telefono, direccion)
VALUES ('nombre_patologia', 'nombre_consultorio', 'nombre_medico', '123456789', 'dirección_consultorio');

UPDATE Consultorios
SET patologia = 'nueva_patologia', consultorioNombre = 'nuevo_nombre', medicoNombre = 'nuevo_medico', telefono = '987654321', direccion = 'nueva_direccion'
WHERE id = 1;

DELIMITER //

CREATE FUNCTION ValidatePassword(password VARCHAR(255)) RETURNS BOOLEAN DETERMINISTIC
BEGIN
    DECLARE isValid BOOLEAN;

    SET isValid = (password REGEXP '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$');

    RETURN isValid;
END//

DELIMITER ;
DELIMITER //

CREATE TRIGGER EmailConfirmedTrigger AFTER INSERT ON EmailConfirmationRequests
FOR EACH ROW
BEGIN
    UPDATE Users
    SET IsEmailConfirmed = TRUE
    WHERE UserID = NEW.UserID;
END//

DELIMITER ;









