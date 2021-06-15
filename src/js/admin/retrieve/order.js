/**
 * function to fetch orders
 * @param type
 * 0 : undelivered
 * 1 : Delivered
 */
async function fetchOrders(type, render = false) {
    var url = app_url + "modules/admin/retrieve/orders.php";
    await $.ajax({
        url: url,
        method: "post",
        data: {
            type: type
        },
        success: function (response) {
            if (response !== "") {
                var data = JSON.parse(response);

                //undelivered
                if (type == 0) {
                    undelivered = data;

                    //render as table
                    if (render == true) {
                        orderTable(undelivered);
                    }
                }


                //delivered
                if (type == 1) {

                    deliveredProducts = data;

                    //render as table
                    if (render == true) {
                        orderTable(deliveredProducts);
                    }
                }
            } else {
                if (type == 0) {
                    undelivered = '';
                    //render as table
                    if (render == true) {
                        orderTable(undelivered);
                    }
                } if (type == 1) {
                    deliveredProducts = '';
                    //render as table
                    if (render == true) {
                        orderTable(deliveredProducts);
                    }
                }
            }
        }

    })
}