$(document).ready( function() {
    init();
    drawMenu('starter');

    // ---------------------------------
    //      button pressing code
    // ---------------------------------

    // When a menu item in the menu is clicked
    $('.menu-area .item').on("click", function() {

        var id = $(this).attr('id');                
        let item = menuItems.find(function(obj){
            return obj.id == id;
        });

        console.log(item);

        // If the item we clicked on is found in our data, then
        // we can open the modal and populate it with the data 
        // associated with that items id.
        if (typeof item != "undefined") {
            $.featherlight($('.popup-modal #item'), {});
            var modal = '.featherlight-content #item';
            $(modal + ' h1').html(item['title']);
            $(modal + ' h2.cost').html(item['price']);
            $(modal + ' .image').css('background-image', 'url("img/' + item['photoName'] + '.jpg")');
        }
    });

    $('.menu .tabs .item').click( function() {
        // console.log(  );
        // $('#start').html('');
        $('.menu .tabs .item').removeClass('active');
        $(this).addClass('active');
        drawMenu($(this).find('a').attr('href').substring(1));
    });

    // Order button
    $("#order").click( function() {
        console.log("order");
    });

    // Help Button
    $("#help").click( function() {
        console.log("help!");
        if($("#help-screen").is(":visible")){
            $("help-screen").fadeOut();
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

            $("#start").append('<div class="col-sm-4 parent"><div class="item" id="' + id + '" data-category="' + category + '">' + 
                '<div class="photo" style="background-image: url(img/'+ photoName + '.jpg)"></div>' + 
                '<div class="text">' + '<h1>' +  title + '</h1>' + 
                '<h2>' + price + '</h2>' + "</div></div>");
        });
    }

    function drawMenu(category) {
        // let items = menuItems.filter(function(item){
        //     return item['category'] == category;
        // });

        $('.menu-area .item').hide();

        $('.menu-area .item').each( function() {
            if( $(this).attr('data-category') == category ) {
                $(this).show();
            }
        });
    }

});