<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Test project</title>
    <meta content="Test project description" name="description">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <link href="assets/css/global.css" rel="stylesheet">
    <link href="assets/css/bootstrap/bootstrap.css" rel="stylesheet">
</head>
<body>


<div class="container">
    <div class="row main">


        <div class="item col-sm-12  ">

            <h1>Test projet </h1>
        </div>
        <?php
// Constante à verifier selon l'hebergement 

define('SRC_PATH', dirname(__DIR__) . '/src/');

function __autoload($class_name) {
    require_once(  SRC_PATH.$class_name . '.php');
}

function get_redirect_target($url)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, 1);
    curl_setopt($ch, CURLOPT_NOBODY, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $headers = curl_exec($ch);
    curl_close($ch);
    // Check if there's a Location: header (redirect)
    if (preg_match('/^Location: (.+)$/im', $headers, $matches))
        return trim($matches[1]);
    // If not, there was no redirect so return the original URL
    // (Alternatively change this to return false)
    return $url;
}

$rest  = new RestCllient();
// TODO  php.ini  curl.cainfo = /path/of/the/keys/cacert.pem
$posts  = $rest->setUrl('http://jsonplaceholder.typicode.com/posts')->get();
$obj_posts = json_decode($posts["content"]);
 $i=0;


foreach($obj_posts  as $post)

    {  
$i++;
if($i>30)
break ;

//TODO systeme de pagination 
    
          ?> 
        <div class="item  col-sm-12  "><img src="<?php  echo get_redirect_target("https://source.unsplash.com/random"); ?>" />

                 <p> <?php  echo  $post->title;  ?> </p>
        </div>
         
     <?php  }  ?>
     

    </div>
</div>


    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="assets/js/main.js"></script>

</body>
</html>
