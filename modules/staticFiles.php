<script src="<?php echo $app_url; ?>src/js/jquery.js"></script>
<script src="<?php echo $app_url; ?>src/js/pace.js"></script>
<!-- <script src="<?php echo $app_url; ?>src/js/select2.js"></script> -->
<!-- <script src="<?php echo $app_url; ?>src/js/leaflet.js"></script> -->

<script type="text/javascript" src="<?php echo $app_url; ?>modules/app.php"></script>

<!-- <script type="text/javascript" src="<?php echo $app_url; ?>src/js/app.js"></script>-->

<link rel="stylesheet" href="<?php echo $app_url; ?>src/css/bootstrap.css">
<!-- <link rel="stylesheet" href="<?php echo $app_url; ?>src/css/select2.css"> -->
<link rel="stylesheet" href="<?php echo $app_url; ?>src/css/main.css">

<!-- <link rel="stylesheet" href="<?php echo $app_url; ?>src/css/leaflet.css"> -->


<!-- service worker -->
<script>
    //app data
    var app_url = "<?php echo $app_url; ?>";
    var app_icon = "<?php echo $app_icon; ?>";
    var app_description = "<?php echo $app_description; ?>";
    var user_icon = "<?php echo $user_icon; ?>";
    var upload_folder = "<?php echo $upload_folder; ?>";
    var product_default = "<?php echo $product_default; ?>";

    //user data
    <?php
    if (isset($_SESSION['id'])) {
        $user_id = $_SESSION['id'];
        $user_type = $_SESSION['type'];
    ?>
        var userId = <?php echo $user_id; ?>;
        var userType = <?php echo $user_type; ?>;
        var logged = true;
    <?php
    }
    ?>

    //service worker to cache files and make website faster
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('<?php echo $app_url; ?>src/js/sw.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration
                    .scope);
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    $(document).ajaxStart(function() {
        Pace.restart();
    });

    window.paceOptions = {
        // Only show the progress on regular and ajax-y page navigation,
        // not every request
        restartOnRequestAfter: 5,

        ajax: {
            trackMethods: ['GET', 'POST', 'PUT', 'DELETE', 'REMOVE'],
            trackWebSockets: true,
            ignoreURLs: []
        }
    };
</script>

<style>
    .pace {
        -webkit-pointer-events: none;
        pointer-events: none;

        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    .pace-inactive {
        display: none;
    }

    .pace .pace-progress {
        background: #29d;
        position: fixed;
        z-index: 2000;
        top: 0;
        right: 100%;
        width: 100%;
        height: 2px;
    }
</style>

<!-- Image popup -->
<div id="popup" style="display:none;">
    <span id="closePopup">&times;</span>
    <img src="" id="popupImg">
</div>