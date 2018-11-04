$(document).ready( function() {

init();     // populate the menu etc....

// When a menu item in the menu is clicked
$('.menu-area .item').on("click", function() {

    var id = $(this).attr('id');                    // get the id
    $.featherlight($('.popup-modal #item'), {});    // open the modal

    
    for(var i = 0; i < menuItemData.length; i++){
        if(menuItemData[i][0] === id){
            var curr = menuItemData[i];             // find the rest of the item's data using the ID
            break;
        }
    }

    //  Fill all the modal fields with relevant data
    var modal = '.featherlight-content #item';
    $(modal + ' h1').html(curr[1]);
    $(modal + ' h2.cost').html(curr[2]);
    $(modal + ' .image').css('background-image', 'url("img/' + curr[0] + '.jpg")');
});

// ---------------------------------
//      button pressing code
// ---------------------------------

// When the "order" button is clicked
$("#order").click( function() {
    console.log("order");
});

// When the help button is clickded
$("#help").click( function() {
    console.log("help!");
    if($("#help-screen").is(":visible")){
        $("help-screen").fadeOut();
    } else {
        $("#help-screen").fadeIn();
    }
});
$("#help-screen #overlay").click( function(){
    $("#help-screen").fadeOut();
});

function init() {
    // Fill the menu with all the items
    menuItemData.forEach(function(element) {
        var id = element[0];        // item ID
        var title = element[1];     // item title
        var price = element[2];     // item price
        
        // Create the main list
        $("#start").append('<div class="col-sm-4 parent"><div class="item" id="' + id + '">' + 
         '<div class="photo" style="background-image: url(img/'+ id + '.jpg)"></div>' + 
         '<div class="text">' + '<h1>' +  title + '</h1>' + 
         '<h2>' + price + '</h2>' + "</div></div>");
    
    });
}


});