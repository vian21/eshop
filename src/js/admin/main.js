$(document).ready(function () {
if(typeof logged!=='undefined'&&userType==0){
    fetchUserInfo();

    fetchOrders(0, true)

    fetchOrders(1).then(function () {
        $("#orders").click(function () {
            orderTable(undelivered);
        })

        $("#delivered").click(function () {
            orderTable(deliveredProducts);
        })
    })

    fetchProducts().then(function () {
        $("#products").click(function () {
            productsTable();
        })
    })

    fetchCategories().then(function () {
        $("#categoryTab").click(function () {
            categoriesTable();
        })
    })}

})
