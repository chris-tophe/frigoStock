<?
$idFood = filter_input(INPUT_POST, "idFood");

require('./BDD.php');
if ( $idFood ) {
    $req = "UPDATE ChrisFood SET deleteDate=NOW() WHERE idFood = :idFood;";
    $statement = $DB->prepare($req);
    $statement->bindParam(":idFood", $idFood);
    if ($statement->execute()){
        
    }else{
        http_response_code(500);
    }
}
else{
    http_response_code(400);
}