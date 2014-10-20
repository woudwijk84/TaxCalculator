<html>
<body>
<?php
$schijf = "";
$inkomen = $_POST["inkomen"];
$total = ($inkomen * 12) ;
if($inkomen <= 19645){
$schijf = "Schijf 1";
} elseif ($inkomen >= 19646 && $inkomen <= 33363) {
    $schijf = "Schijf 2";
} elseif ($inkomen >= 33364 && $inkomen <= 56531) {
    $schijf = "Schijf 3";
} else {
    $schijf = "Schijf 4";
}

//$total = $_POST["number1"] + $_POST["number2"];
?>
U inkomen wordt berekend in <?php echo $schijf;?> <br>

De voorlopige belasting teruggave is: <?php echo $total; ?>

</body>
</html>