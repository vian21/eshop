$('document').ready(function () {
    /**
     * JS functions for the drop down menu in navbar
     */
    //handle onclick somewhere else other that the dropdown -->hide
    const $menu = $('.dropdown-content');
    $(document).mouseup(function (e) {
        if (!$menu.is(e.target) // if the target of the click isn't the container...
            &&
            $menu.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $menu.css("display", "none");
        }
    });
    //Ontouch for touchscreens -->close dropdown
    $(document).on('touchend', function (e) {
        if (!$menu.is(e.target) // if the target of the click isn't the container...
            &&
            $menu.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $menu.css("display", "none");
        }
    });
    //activate dropdown
    $(".settings").click(function () {
        $(".dropdown-content").css("display", "block")
    })

    /**
     * fetch data via ajax
     */
    //app info
    fetchUserInfo();
    fetchAllProducts().then(function(){
        productsRenderer();
        fetchCategoricalProducts();
    });
})