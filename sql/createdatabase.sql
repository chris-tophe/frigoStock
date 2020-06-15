CREATE TABLE ChrisFoodType(
    idFoodType INT NOT NULL AUTO_INCREMENT,
    nameFoodType VARCHAR(30) NOT NULL,
    CONSTRAINT foodtype_idfoodtype_pk PRIMARY KEY (idFoodType)
);
CREATE TABLE ChrisFood(
    idFood INT NOT NULL AUTO_INCREMENT,
    nameFood VARCHAR(50) NOT NULL,
    idFoodType INT NOT NULL,
    expireDateFood DATE NOT NULL,
    createDate DATE NOT NULL,
    updateDate DATE NULL,
    deleteDate DATE NULL,
    CONSTRAINT food_idfood_pk PRIMARY KEY (idFood),
    CONSTRAINT food_idfoodtype_fk FOREIGN KEY (idFoodType)
        REFERENCES ChrisFoodType(idFoodType)
);
CREATE TABLE ChrisUser(
    idUser INT NOT NULL AUTO_INCREMENT,
    nameUser VARCHAR(30) NOT NULL,
    emailUser VARCHAR(50) NOT NULL,
    passUser VARCHAR(50) NOT NULL,
    CONSTRAINT user_iduser_pk PRIMARY KEY (idUser)
);
CREATE TABLE ChrisFridge(
    idFridge INT NOT NULL AUTO_INCREMENT,
    idFood INT NOT NULL,
    idUser INT NOT NULL,
    CONSTRAINT fridge_idfridge_pk PRIMARY KEY (idFridge),
    CONSTRAINT fridge_idfood_fk FOREIGN KEY (idFood)
        REFERENCES ChrisFood(idFood),
    CONSTRAINT fridge_iduser_fk FOREIGN KEY (idUser)
        REFERENCES ChrisUser(idUser)
);

INSERT INTO ChrisFoodType (nameFoodType) 
    VALUES ("Fruits"),("Legumes"),("Yaourt"),("Déssert"),("Viande"),
            ("Poisson"),("Oeufs"),("Boisson"),("Reste de repas");