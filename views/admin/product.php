<?php
session_start();
include '../../modules/config.php';
include '../../modules/functions.php';
if (!isset($_SESSION['id']) || !isset($_POST['id']) || !is_numeric($_POST['id'])) {
    header("location:" . $app_url . 'login.php');
}
$product = sanitize($_POST['id']);
?>

<style>
    #container {
        width: 100%;
    }

    form {
        width: 250px;
        text-align: center;
        padding-top: 100px;
    }

    form input {
        width: 100%;
        font-family: Montserrat-Bold;

    }

    form select {
        width: 100%;
        height: 45px;
        font-family: Montserrat-Bold;

    }

    button {
        border: 0;
        border-radius: 3px;
        color: white;
        background-color: #428bca;
        margin-top: 5px;
    }



    #submit {
        width: 250px;
        text-decoration: none;
        font-size: 15px;
        height: 45px;
        height: 45px;

        font-family: Arial, Helvetica, sans-serif;
    }
</style>

<body>
    <div id="container">
        <center>
            <form enctype="multipart/form-data" id="form">

                <img src="" alt="img" id="img">
                <input type="file" name="image" id="imgChoose">


                <h5>Name</h5>
                <input type="text" name="name" id="name" autocomplete="off" required><br><br>

                <h5>Description</h5>
                <input type="text" name="description" id="description" required autocomplete="off"><br><br>

                <h5>Quantity</h5>
                <input type="number" name="quantity" id="quantity" required autocomplete="off"><br><br>

                <h5>price</h5>
                <input type="tel" name="price" id="price" autocomplete="off" required><br><br>

                <h5>category</h5>
                <select name="category" id="category"></select>
                <br><br>
                <h1></h1>
            </form>
    </div>
    </center>
</body>
<script>
    var product = <?php echo $product; ?>;
    var data = all_products[product];
    var product_id=data['id'];

    $('document').ready(function() {

        /**
         * Append user data into form
         */
        var image = data['image']
        if (image == '') {
            $('#img').attr('src', product_default);
        } else {
            $('#img').attr('src', upload_folder + image);
        }
        $("#name").val(data['name']);
        $("#description").val(data['description']);
        $("#quantity").val(data['quantity']);
        $("#price").val(data['price']);
        $("#category").html(categoryOptions());
        $("#category").val(data['category']).trigger('change')


        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#img').attr('src', e.target.result);

                }
                reader.readAsDataURL(input.files[0]);

                var image = $("#imgChoose")[0].files[0];
                updateProductImage(product_id, image, data['image']);
            }
        }


        //If user selects an image
        $("#imgChoose").change(function() {
            readURL(this);
        });

        $("#name").change(function() {
            if ($(this).val() == '') {
                alert("Please enter a product name!")
            } else {
                removeMsg();
                updateProductName(product_id, $(this).val());
            }
        })

        $("#description").change(function() {
            if ($(this).val() == '') {
                alert("Please enter a description!")
            } else {
                removeMsg();
                updateProductDescription(product_id, $(this).val())
            }
        })

        $("#quantity").change(function() {
            if ($(this).val() == '') {
                alert("Please enter quantity!")
            } else {
                removeMsg();
                updateProductQuantity(product_id, $(this).val())
            }
        })

        $("#price").change(function() {
            if ($(this).val() == '') {
                alert("Please enter price!")
            } else {
                removeMsg();
                updateProductPrice(product_id, $(this).val())
            }
        })

        $("#category").change(function() {

            removeMsg();
            updateProductCategory(product_id, $(this).val())
        })

    })
</script>