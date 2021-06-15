async function deleteProduct(id) {
    var url = app_url + "modules/admin/delete/product.php";
    if (confirm("Are you sure to delete product?")) {
        await $.ajax({
            url: url,
            method: "post",
            data: {
                id: id
            },
            success: function (response) {
                if (response == 'ok') {

                    loading();
                    fetchProducts(true);
                    alert("Product Deleted!");
                } else {
                    alert("Failed to delete products");
                    productsTable();
                }
            }
        })
    }

}