<button id="orders">Orders</button>
<button id="delivered">Delivered</button>
<div id=cartDesk>
</div>
<script>
    $(document).ready(function() {
        $("#desk").css('display', 'block');
        fetchUserOrders(0, true);
        fetchUserOrders(1);

        $("#orders").click(function() {
            userOrderTable(undelivered);
        })

        $("#delivered").click(function() {
            userOrderTable(deliveredProducts);
        })

    })


    /**
     * function to fetch orders
     * @param type
     * 0 : undelivered
     * 1 : Delivered
     */
    async function fetchUserOrders(type, render = false) {
        var url = app_url + "modules/user/retrieve/orders.php";
        await $.ajax({
            url: url,
            method: "post",
            data: {
                type: type
            },
            success: function(response) {
                if (response !== "") {
                    var data = JSON.parse(response);

                    //undelivered
                    if (type == 0) {
                        undelivered = data;

                        //render as table
                        if (render == true) {
                            userOrderTable(undelivered);
                        }
                    }


                    //delivered
                    if (type == 1) {

                        deliveredProducts = data;

                        //render as table
                        if (render == true) {
                            userOrderTable(deliveredProducts);
                        }
                    }
                } else {
                    if (type == 0) {
                        undelivered = '';
                        //render as table
                        if (render == true) {
                            userOrderTable(undelivered);
                        }
                    }
                    if (type == 1) {
                        deliveredProducts = '';
                        //render as table
                        if (render == true) {
                            userOrderTable(deliveredProducts);
                        }
                    }
                }
            }

        })
    }


    /**
     * generate a transaction table
     */
    function userOrderTable(data) {
        var table = "<table><tr>\
                <th></th>\
                <th>#</th>\
                <th>Name</th>\
                <th>Tel</th>\
                <th>Item</th>\
                <th>Quantity</th>\
                <th>Total</th>\
                </tr>";

        var number = 0;
        if (data !== undefined) {
            for (var i = 0; i < data.length; i++) {
                number++;

                table += "<tr>";

                table += "<td><button id=" + i + " class=order>View</button></td>";

                table += "<td>" + number + "</td>";
                table += "<td>" + data[i]['name'] + "</td>";
                table += "<td>" + data[i]['tel'] + "</td>";
                table += "<td>" + data[i]['product_name'] + "</td>";
                table += "<td>" + data[i]['quantity'] + "</td>";
                var total = parseInt(data[i]['total']);
                table += "<td>" + total.toLocaleString() + "</td>";

                table += "</tr>"
            }
            table + "</table>";
        }


        $("#cartDesk").html(table)

        $(".order").click(function() {
            event.preventDefault();
            var id = $(this).attr('id');

            userOrderInfo(data[id]);
        })
    }

    /**
     * 
     * Function to generate info about order and action such as deliver,delete,...
     * @param data array 
     */
    function userOrderInfo(data) {
        var html = "";

        if (data.length !== 0) {
            //map
            html += "<div class=container></div>"

            //user info
            html += "<div class=container>";

            if (data['image'] == '') {
                var customerImage = user_icon;
            } else {
                var customerImage = upload_folder + data['image']
            }
            html += "<img id=customer src=" + customerImage + " onclick=pop()>";
            html += "<div>Name: <span>" + data['name'] + "</span></div>";
            html += "<div>Tel: <span>" + data['tel'] + "</span></div>";
            html += "<div>Email: <span>" + data['email'] + "</span></div>";

            html += "</div>";

            //item info
            html += "<div class=container>";
            if (data['product_image'] == '') {
                var productImage = product_default;
            } else {
                var productImage = upload_folder + data['product_image']
            }
            html += "<center><img id=product src=" + productImage + " onclick=pop()></center>";
            html += "<div>Name: <span>" + data['product_name'] + "</span></div>";
            html += "<div>Description: <span>" + data['description'] + "</span></div>";
            html += "<div>Quantity: <span>" + data['quantity'] + "</span></div>";
            html += "<div>Total: <span>" + parseInt(data['total']).toLocaleString() + "</span></div>";

            html += "</div>";

            //if the order is not delivered
            html += "<div class=container><center>";

            if (data['status'] == 0) {
                html += "<button id=deleteOrder class='delete actions'>Delete</button>";

            }

            html += "</center></div>";

            $("#cartDesk").html(html);
            $("#cartDesk").css('display', 'block');

            $("#showmap").click(function() {
                var coordinates = data['shipping_address'].split(',');
                var latitude = coordinates[0];
                var longitude = coordinates[1];

                var url = "https://www.google.com/maps?z=12&t=m&q=loc:" + latitude + '+' + longitude;

                window.open(url, '_blank');
            })

            $("#deleteOrder").click(function() {
                deleteTransaction(data['id']);
            })
        }

    }
</script>