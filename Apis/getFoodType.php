<?
require("./BDD.php");

$sql = "SELECT idFoodType, nameFoodType FROM ChrisFoodType;";
$PDOState = $DB->query($sql);
$resultat = $PDOState->fetchAll(PDO::FETCH_NAMED);
if (count($resultat) > 0) {
    header('Content-Type: application/json');
    echo json_encode($resultat);
}
