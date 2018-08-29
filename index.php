<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<script
  src="jquery-3.3.1.min.js">
  </script>
<script
  src="puissance.js">
  </script>
  <link rel="stylesheet" type="text/css" href="style.css">
<body>
  <div class='navbar'>
    
	<h1 style="margin-left: 1%;">Puissance 4</h1>
<div class ="element-navbar">
  
<div id="tour">
</div>
 <div id="score">
 </div>
<div id="p1">
</div>
<div id="p2">
</div>
</div>
</div>
<center>
<div id="grid">

</div>
</center>
<script>
    $(document).ready( function() {
        $("#grid").grid(5, 5, "red", "yellow", "Lorcann", "Killian", "1");

    } );

</script>
</body>
</html>