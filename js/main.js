
var currOrder = new Array();            // holds the current order
var otherOrder = new Array();            // holds a copy of the current order
var orderTotal = 0.0;                   // the total cost of the order
var popThreshold = 8;           // Minimum popularity rating for items to be in popular tab
var editMode = false;


$(document).ready( function() {

    $('.menu-area').height($(window).height() - 400);               // resizes the menu area based on window height
    $('.overview').height($(window).height() - 475);

    // Whenever the window is resized, resize the menu area
    $(window).resize(function () {
        $('.menu-area').height($(window).height() - 400);
        $('.overview').height($(window).height() - 475);
    });

    init();                     // initialize 
    drawMenu('starter');        // set the initial category to "starters"

    // ---------------------------------
    //      button pressing code
    // ---------------------------------

    // When a menu item in the menu is clicked
    $('.menu-area .item').on("click", function() {
        var id = $(this).attr('id');                
        let item = menuItems.find(function(obj){
            return obj.id == id;
        });

        // If the item we clicked on is found in our data, then
        // we can open the modal and populate it with the data 
        // associated with that items id.
        if (typeof item != "undefined") {
            $.featherlight($('.popup-modal #item'), {});
            var modal = '.featherlight-content #item';
            $(modal + ' h1').html(item['title']);
            $(modal + ' h2.cost').html(item['price']);
            $(modal + ' .row .description').html(item['description']);
            $(modal + ' .row .nutrition').html('Item Calories: ' + item['calories']);
            $(modal + ' .image').css('background-image', 'url("img/' + item['photoName'] + '.jpg")');
            $(modal + ' #add-item-to-order').attr('data-id', item['id']);
        }
    });

    $('.menu .tabs .item').click( function() {
        $('.menu .tabs .item').removeClass('active');
        $(this).addClass('active');
        drawMenu($(this).find('a').attr('href').substring(1));
    });

    $('.start-screen').click( function() {
        $(".start-screen").fadeOut(700);
    });

    // Order button
    $("#order, #add-to-order").click( function() {
        // console.log("order");
        if($(".order-overview").is(":visible")){
            editMode = true;
            toggleEditMode();
            $(".order-overview").fadeOut();
        } else {
            $(".order-overview").fadeIn();
        }
    });

    // Help Button
    $("#help").click( function() {
        console.log("help!");
        if($("#help-screen").is(":visible")){
            $("#help-screen").fadeOut();
        } else {
            $("#help-screen").fadeIn();
        }
    });

    // When the help screen is displayed, check if 
    // we have clicked outside of the content to 
    // hide the help screen
    $("#help-screen #overlay").click( function(){
        $("#help-screen").fadeOut();
    });

    $('#add-item-to-order').click( function() {
        addToOrder($(this).attr('data-id'));
        // console.log($(this).attr('data-id'));
    });

    $('#edit-order').click( function() {
        toggleEditMode();
        // console.log($(this).attr('data-id'));
    });

    // Removes an item from an order when the "remove item" button is clicked
    $('.order-overview').on("click", ".remove-item-from-order", function() {
        removeFromOrder($(this).attr('data-id'));
    });

    // ---------------------------------
    //      Initialization code
    // ---------------------------------

    function init() {
        menuItems.forEach(function(item) {
            let id = item['id'];
            let photoName = item['photoName'];
            let title = item['title'];
            let price = item['price'];
            let category = item['category'];

            $("#start").append(
                '<div class="col-sm-6 col-md-4 parent">' + 
                    '<div class="item" id="' + id + '" data-category="' + category + '">' + 
                        '<div class="photo" style="background-image: url(img/thumbs/'+ photoName + '.jpg)"></div>' + 
                        '<div class="text">' + '<h1>' +  title + '</h1>' + 
                        '<h2>' + price + '</h2>' + 
                    '</div>' +
                '</div>'
            );
        });
    }

    function drawMenu(category) {
        if (category == 'popular') {
            $('.menu-area .item').each(function() {
                var id = $(this).attr('id');
                
                // Find the item with this matching id
                var item = menuItems.find(function(element){
                    return element['id'] == id;
                }); 

                // If the popularity of the given item meets
                // or is greater than the specified popularity
                // threshold, then display the item.
                if (item['popularity'] >= popThreshold) {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }
            });
        } else {
            // Iterate through each menu item in the menu
            // If it is the filtered category, show it
            // else hide it
            $('.menu-area .item').each( function() {
                if( $(this).attr('data-category') == category ) {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }
            });
        }
    }
    
    // Given an ID, adds specific menu item to the customer's order
    function addToOrder(id) {

        // First get the menu item object from the list
        var itemToAdd = menuItems.find(function(element){
            return element['id'] == id;
        });

        // adds the formatted item to the "your order" screen
        $('.order-overview .overview').append(

            '<div class="item">' + 
                '<div class="row">' + 
                    '<div class="col-sm-3 image" style="background-image: url(img/thumbs/' + itemToAdd['photoName'] + '.jpg);"></div>' + 
                    '<div class="col-sm-6 details">' + 
                        '<h2>' + itemToAdd['title'] + '</h2>' + 
                        '<div class="btn remove-item-from-order" data-id="' + itemToAdd['id'] + '">Remove Item</div>' + 
                    '</div>' + 
                    '<div class="col-sm-3 cost">' + 
                        '<h3>$' + itemToAdd['price'] + '</h3>' + 
                    '</div>' + 
                '</div>' + 
            '</div>'
        );
        
        $('.remove-item-from-order').hide();

        currOrder.push(itemToAdd);                                  // add the item to the customers order
        orderTotal += itemToAdd['price'];                           // add the cost of the item to the total cost

        $('.order-overview .total h2').html('$' +  Math.floor(orderTotal * 100) / 100);      // output the new total at the bottom of the order page (truncated to 2 decimals)


        if(currOrder.length > 0){
            $('#order').removeClass('disabled');                    // make the order button green when an order has items in it
            $('.btn#order .qty').html(' (' + currOrder.length + ')');
            $('.btn#order').css('transform', 'scale(1.3)')
            setTimeout(function() {
                $('.btn#order').css('transform', 'scale(1.0)');
            }, 150);
        } else {
            $('#order').addClass('disabled');                
            $('.btn#order .qty').html('');
        }
    }

    function removeFromOrder(id) {
        orderTotal = 0;
        $(".order-overview .overview").empty();
        $('.order-overview .total h2').html('$' +  Math.floor(orderTotal * 100) / 100);      // output the new total at the bottom of the order page (truncated to 2 decimals)
        $('#order').addClass('disabled');                
        $('.btn#order .qty').html('');

        // First get the menu item object from the list
        var itemToRemove = menuItems.find(function(element){
            return element['id'] == id;
        });

        currOrder.splice(currOrder.indexOf(itemToRemove), 1);
        
        currOrder.forEach(function(item){
            addToOrder(item['id']);
        });
    }

    function toggleEditMode() {
        if(!editMode)
        {
            $('#edit-order').html("cancel editing")
            $('.order-overview .overview .remove-item-from-order').fadeIn();
            editMode = true;
        } else
        {
            $('#edit-order').html("edit <i class=\"fas fa-edit\"></i>")
            $('.order-overview .overview .remove-item-from-order').fadeOut();
            editMode = false;
        }
    }

});