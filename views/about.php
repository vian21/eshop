<?php include '../modules/config.php'; ?>
<style>
    #container {
        width: 100%;
        display: block;
        height: 100%;
    }

    h1 {
        padding-top: 50px;
    }

    img {
        width: 30%;
    }

    p {
        margin-top: 50px;
    }

    p a {

        color: #4BCFFA;
        margin-bottom: 10px;
    }
</style>

<div id="container">
    <center>
        <h1><?php echo $app_name; ?></h1><br>
        <h5><?php echo $app_description; ?></h5><br>
        <img src="<?php echo $app_icon ?>" alt="">
        <p>Created by
            <a href="<?php echo $dev_url ?>" target="blank"><?php echo $dev_name; ?></a>
        </p>
    </center>
</div>