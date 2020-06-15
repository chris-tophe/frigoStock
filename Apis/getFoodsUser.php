<?
$idUser = filter_input(INPUT_POST,"idUser");

require ("./BDD.php");

if ($idUser) {
    $sql = "SELECT ChrisFood.idFood, nameFood, expireDateFood, nameFoodType, ChrisFood.idFoodType FROM ChrisFridge
            INNER JOIN ChrisFood ON ChrisFridge.idFood=ChrisFood.idFood
            INNER JOIN ChrisFoodType ON ChrisFoodType.idFoodType=ChrisFood.idFoodType
            WHERE idUser = $idUser AND deleteDate IS NULL
            ORDER BY expireDateFood;";
    $PDOState = $DB->query($sql);
    if ($PDOState != false){
        $resultat = $PDOState->fetchAll(PDO::FETCH_NAMED);
        if (count($resultat) > 0) {
            echo json_encode($resultat);
        }
        else{
        http_response_code(404);
        echo json_encode("");
        }
    }
    http_response_code(500);
    
}
else{
    http_response_code(400);
}