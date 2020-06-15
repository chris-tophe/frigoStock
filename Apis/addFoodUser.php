<?
$nameFood = filter_input(INPUT_POST, "nameFood");
$idFoodType = filter_input(INPUT_POST, "idFoodType");
$expireDateFood = filter_input(INPUT_POST, "expireDateFood");
$idUser = filter_input(INPUT_POST, "idUser");
$idFood = filter_input(INPUT_POST, "idFood");

require('./BDD.php');
if ($nameFood && $idFoodType && $expireDateFood && $idUser) {
    $req = "INSERT INTO ChrisFood(nameFood,idFoodType,expireDateFood,createDate)
    VALUES (:nameFood,:idFoodType,:expireDateFood,NOW());";
    $statement = $DB->prepare($req);
    $statement->bindParam(":nameFood", $nameFood);
    $statement->bindParam(":idFoodType", $idFoodType);
    $statement->bindParam(":expireDateFood", $expireDateFood);
    $statement->execute();
    $idFood = $DB->lastInsertId();
    if (!$idFood){
        http_response_code(500);
        die;
    } 
    $req2 = "INSERT INTO ChrisFridge(idFood,idUser) VALUES (:idFood,:idUser);";
    $statement = $DB->prepare($req2);
    $statement->bindParam(":idFood", $idFood);
    $statement->bindParam(":idUser", $idUser);

    if ($statement->execute()){
        http_response_code(201);
    }else{
        http_response_code(500);
    }
}
else if($nameFood && $idFoodType && $expireDateFood && $idFood) {
    $req = <<<SQL
UPDATE ChrisFood
SET nameFood = :nameFood, idFoodType = :idFoodType, expireDateFood=:expireDateFood, updateDate=NOW()
WHERE idFood = :idFood ;
SQL;
    $statement = $DB->prepare($req);
    $statement->bindParam(":nameFood", $nameFood);
    $statement->bindParam(":idFoodType", $idFoodType);
    $statement->bindParam(":expireDateFood", $expireDateFood);
    $statement->bindParam(":idFood", $idFood);
    if ($statement->execute()){
        echo "update success";
        http_response_code(200);
    }
    else{
        echo "update failed";
        http_response_code(500);
    }
}
else {
    http_response_code(400);
}