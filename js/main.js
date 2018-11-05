$(document).ready( function() {
    init();

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
            $(modal + ' .image').css('background-image', 'url("img/' + item['photoName'] + '.jpg")');
        }
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

    // When the modal is displayed, check if 
    // we have clicked outside of the modal to 
    // display the content
    $("#help-screen #overlay").click( function(){
        $("#help-screen").fadeOut();
    });

    // ---------------------------------
    //      Initialization code
    // ---------------------------------
    function init() {
        let entrees = menuItems.filter(function(item){
            return item['category'] == 'entree';
        });

        let desserts = menuItems.filter(function(item){
            return item['category'] == 'dessert';
        });

        let appetizers = menuItems.filter(function(item){
            return item['category'] == 'appetizers';
        });

        let drinks = menuItems.filter(function(item){
            return item['category'] == 'drinks';
        });

        entrees.forEach(function(item) {
            let id = item['id'];
            let photoName = item['photoName'];
            let title = item['title'];
            let price = item['price'];

            $("#start").append('<div class="col-sm-4 parent"><div class="item" id="' + id + '">' + 
                '<div class="photo" style="background-image: url(img/'+ photoName + '.jpg)"></div>' + 
                '<div class="text">' + '<h1>' +  title + '</h1>' + 
                '<h2>' + price + '</h2>' + "</div></div>");
        });
    }
});