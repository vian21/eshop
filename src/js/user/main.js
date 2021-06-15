$('document').ready(function () {

    if (typeof logged !== 'undefined' && userType == 1) {   /**
     * fetch data via ajax
     */

        //app info
        fetchUserInfo();

        getLocation();

        loading();

        fetchAllProducts();

        /**
         * user search
         */
        $("#inputBox").change(function () {
            event.preventDefault();

            if ($(this).val() !== "") {
                loading();
                searchProduct($(this).val());
            }

        })
    }
})