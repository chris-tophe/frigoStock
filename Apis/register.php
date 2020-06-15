<?
$nameUser = filter_input(INPUT_POST, "nameUser");
$emailUser = filter_input(INPUT_POST, "emailUser");
$passUser = filter_input(INPUT_POST, "passUser");

require ("./BDD.php");

if ($nameUser && $emailUser && $passUser) {
    $sql = "SELECT idUser FROM ChrisUser WHERE emailUser = \"$emailUser\";";
    $PDOState = $DB->query($sql);
    $resultat = $PDOState->fetchAll(PDO::FETCH_NAMED);
    if (count($resultat) == 0) {
        $PDOState2 = $DB->query("INSERT INTO ChrisUser (nameUser, emailUser, passUser) VALUES (\"$nameUser\", \"$emailUser\", \"$passUser\");");
        http_response_code(201);
        echo 'User created';
    } else {
        http_response_code(409);
        echo "email $emailUser already exists";
    }
} else {
    http_response_code(400);
}