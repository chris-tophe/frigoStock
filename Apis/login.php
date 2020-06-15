<?
$emailUser = filter_input(INPUT_POST, "emailUser");
$passUser = filter_input(INPUT_POST, "passUser");

require ("./BDD.php");

if ($emailUser && $passUser) {
    $sql = "SELECT * FROM ChrisUser WHERE emailUser = \"$emailUser\" AND passUser = \"$passUser\";";
    $PDOState = $DB->query($sql);
    $resultat = $PDOState->fetchAll(PDO::FETCH_NAMED);
    if (count($resultat) == 0) {
        http_response_code(404);
    } else {
        echo json_encode($resultat[0]);
    }
}
else{
    http_response_code(400);
}