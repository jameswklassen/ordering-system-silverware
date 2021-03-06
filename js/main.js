//Global page variables
var currOrder = new Array(); // holds the current order
var uniqueItemIDs = new Array(); // holds the current order (unique attributes)
var orderCustomizations = new Array(); // holds the current order customizations
var specialRequirements = new Array(); // holds the current order customizations
var orderTotal = 0.0; // the total cost of the order
var popThreshold = 8; // Minimum popularity rating for items to be in popular tab
var editMode = false; // Current edit mode
var sentToKitchen = false; // Was the order submitted?
var wasModalEdited = false;	// flag used every time a modal is opened, determines if the users submitted their changes, or canceled

// Methods called when the page is ready
$(document).ready(function() {
	$(".menu .popup-modal").hide(); //hide the menu
	$("body").fadeIn(2000); //Fade in the page slowly
	$(".start-background").fadeIn(2000);
	$('.menu-area').height($(window).height() - 400); // resizes the menu area based on window height
	$('.overview').height($(window).height() - 475);

	// Whenever the window is resized, resize the menu area
	$(window).resize(function() {
		$('.menu-area').height($(window).height() - 400);
		$('.overview').height($(window).height() - 475);
	});

	init(); // initialize 
	drawMenu('popular'); // set the initial category to "starters"
	$('.btn#submit-order-btn').hide(); //hide the submit button to start
	$(".submit-confirm-message").hide();

	// ---------------------------------
	//      button pressing code
	// ---------------------------------

	// When a menu item in the menu is clicked
	$('.menu-area .item').on("click", showModal);

	// Switching menu tabs
	$('.menu .tabs .item').click(function() {
		$('.menu .tabs .item').removeClass('active');
		$(this).addClass('active');
		drawMenu($(this).find('a').attr('href').substring(1));
	});

	// Animation when start screen is triggered
	$('.start-background').click(function() {
		if(!sentToKitchen) {
			$(".start-background").fadeOut(800); // Hide start screen
			$(".menu .popup-modal").fadeIn(800); // show the menu
		}
	});

	// Order button
	$("#order, #add-to-order").click(function() {
		// console.log("order");
		if($(".order-overview").is(":visible")) {
			// Disable the edit mode wehn the order screen is closed.
			editMode = true;
			toggleEditMode();
			$(".order-overview").fadeOut();
			$('.btn#order').show();
			$('.btn#submit-order-btn').hide();
		} else {
			if(currOrder.length > 0) {
				$(".order-overview").fadeIn();
				$('.btn#order').hide();
				if(currOrder.length == 0) {
					$('.btn#submit-order-btn').addClass('disabled');
				} else {
					$('.btn#submit-order-btn').removeClass('disabled');
				}
				$('.btn#submit-order-btn').show();
			}
		}
	});

	// Help Button
	$("#help").click(function() {
		// console.log("help!");
		if($("#help-screen").is(":visible")) {
			$("#help-screen").fadeOut();
		} else {
			$("#help-screen").fadeIn();
		}
	});

	// When the help screen is displayed, check if 
	// we have clicked outside of the content to 
	// hide the help screen
	$("#help-screen #overlay").click(function() {
		$("#help-screen").fadeOut();
	});

	//if the submit button is called go back to start screen
	$("#submit-order-btn").click(function() {
		if(currOrder.length !== 0 && confirm("Are you sure you want to submit your order?")) {
			sentToKitchen = true;
			$(".start-screen").hide(); //hide the logo
			$(".start-background").fadeIn(800); //show the background
			$(".submit-confirm-message").fadeIn(800); //show the message
			$('.order-overview').fadeOut(800); //hide the order overview
			$('.btn#submit-order-btn').fadeOut(800); //hide the submit button to start
			$('.btn#order').fadeIn(800); //show the your order button
			drawMenu('popular');
			$('.menu .tabs .item').removeClass('active');
			$('.menu #default').addClass('active');

			//Clear the order
			currOrder = new Array();
			uniqueItemIDs = new Array();
			orderCustomizations = new Array();
			orderTotal = 0;
			updateTotals();
			$('.order-overview .overview').empty();
			$('#order').addClass('disabled');
			$('.btn#order .qty').html('');
			$(".order-overview").fadeOut();

			// After some time, go back to the start screen
			setTimeout(function() {
				$(".start-screen").fadeIn(500);
				$(".submit-confirm-message").hide();
				sentToKitchen = false;
			}, 5000);
		}
	});

	//if one of the call server buttons is clicked, confirm they want to call
	$("#content").click(function() {
		console.log($(this).children().attr('data-id'));
		if(confirm("Are you sure you want to call the server?")) {
			$("#help-screen").fadeOut();
			$('#help').html('<i class="fas fa-check"></i> server on the way');
			$('#help').addClass('active');
		}
	});

	// Show the customization options when a user decides to add that item
	$('#add-item-to-order').click(function() {
		var oldHeight = $('.featherlight-content').height();
		$('.featherlight-content #item .row .nutrition').hide();
		$('.featherlight-content #item .row .description').hide();
		$('.featherlight-content #item .row .customizations').show();
		$('.featherlight-content #item #add-item-to-order').hide();

		$('.featherlight-content #item #submit-order').show();

		$('.btn#submit-order').css('transform', 'scale(1.3)');
		setTimeout(function() {
			$('.btn#submit-order').css('transform', 'scale(1.0)');
		}, 150);

		if(oldHeight > $('.featherlight-content').height()) {
			$('.featherlight-content').height(oldHeight);
		}
	});

	$('.customizations').on("click", "label", function() {
		$('.btn#submit-order').css('transform', 'scale(1.3)');
		setTimeout(function() {
			$('.btn#submit-order').css('transform', 'scale(1.0)');
		}, 150);
	});

	// Add the item to a user's order
	$('#submit-order').click(function() {
		wasModalEdited = true;	// since the user clicked submit, the modal was edited and changes must be saved
		addToOrder($(this).attr('data-id'));
		$.featherlight.close();
	});

	// Toggle editing view if a user wants to remove items from their order
	$('#edit-order').click(function() {
		if(currOrder.length > 0) {
			toggleEditMode();
		}
	});

	// Shows the edit modal
	$('.order-overview').on("click", ".edit-item-in-order", function() {
		showEditModal($(this).attr('id'), $(this).parent().parent().parent().parent().attr('data-id'));
	});

	// Removes an item from an order when the "remove item" button is clicked
	$('.order-overview').on("click", ".remove-item-from-order", function() {
		//Pass in the unique ID for the item to remove.
		removeFromOrder($(this).parent().parent().parent().parent().attr('data-id'));
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
						'<div class="photo" style="background-image: url(img/thumbs/' + photoName + '.jpg)"></div>' +
						'<div class="text">' + '<h1>' + title + '</h1>' +
							'<h2>$' + price + '</h2>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
		});
	}

	// Draws the menu for the given category
	function drawMenu(category) {
		if(category == 'popular') {
			$('.menu-area .item').each(function() {
				var id = $(this).attr('id');

				// Find the item with this matching id
				var item = menuItems.find(function(element) {
					return element['id'] == id;
				});

				// If the popularity of the given item meets
				// or is greater than the specified popularity
				// threshold, then display the item.
				if(item['popularity'] >= popThreshold) {
					$(this).parent().show();
				} else {
					$(this).parent().hide();
				}
			});
		} else {
			// Iterate through each menu item in the menu
			// If it is the filtered category, show it
			// else hide it
			$('.menu-area .item').each(function() {
				if($(this).attr('data-category') == category) {
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
		var itemToAdd = menuItems.find(function(element) {
			return element['id'] == id;
		});

		// Get the selected customizations
		var selectedOptions = [];
		$("input:checkbox[name=type]:checked").each(function() {
			selectedOptions.push($(this).val());
		});
		orderCustomizations.push(selectedOptions); // Add the customizations to the array

		// Create the string to append to the item summary
		var customizationString = "";
		selectedOptions.forEach(function(option) {
			var newOption = parseOption(option);
			customizationString += newOption + ', ';
		});
		customizationString = customizationString.slice(0, -2);

		currOrder.push(itemToAdd); // add the item to the customers order
		var uniqueID = getID(); // Generate a unique ID for this item
		uniqueItemIDs.push(uniqueID); // Store that in paralell with the original arary

		// Get the special order requirements, if any.
		var requirements = $('.row .customizations .text-field #requirements').val();
		specialRequirements.push(requirements);

		if(requirements !== "") {
			customizationString += " * Special Requirements";
		}

		// adds the formatted item to the "your order" screen
		$('.order-overview .overview').append(
			'<div class="item" data-id="' + uniqueID + '">' +
				'<div class="row">' +
					'<div class="col-sm-3 image" style="background-image: url(img/thumbs/' + itemToAdd['photoName'] + '.jpg);"></div>' +
					'<div class="col-sm-8 details">' +
						'<h2>' + itemToAdd['title'] + '</h2> ' +
						'<div class="order-buttons">' + 
							'<div class="btn edit-item-in-order" id="' + id + '">edit <i class="fas fa-edit" id="' + id + '"></i></div>' +
							'<div class="btn remove-item-from-order" id="' + id + '">Remove Item <i class="fas fa-trash"></i></div><br>' +
						'</div>' + 
						'<p>' + customizationString + '</p>' +
					'</div>' +
					'<div class="col-sm-1 cost">' +
						'<h3>$' + itemToAdd['price'] + '</h3>' +
					'</div>' +
				'</div>' +
			'</div>'
		);

		// Hide the remove buttons
		$('.remove-item-from-order').hide();
		$('.edit-item-in-order').hide();

		orderTotal += itemToAdd['price']; // add the cost of the item to the total cost
		$('.order-overview .total h2').html('$' + Math.floor(orderTotal * 100) / 100); // output the new total at the bottom of the order page (truncated to 2 decimals)

		//Update the order button based on the order length
		updateTotals();
	}

	//Remove an item from an order given that item's unique ID.
	function removeFromOrder(uniqueID) {
		//Remove the item from the arrays
		var itemIndex = uniqueItemIDs.indexOf(uniqueID);
		var itemToRemove = currOrder[itemIndex];
		currOrder.splice(itemIndex, 1);
		uniqueItemIDs.splice(itemIndex, 1);
		orderCustomizations.splice(itemIndex, 1);
		specialRequirements.splice(itemIndex, 1);

		//Find the new order total and update it on the my order screen
		orderTotal -= itemToRemove['price'];
		$('.order-overview .total h2').html('$' + Math.floor(orderTotal * 100) / 100);

		//Fix negative numbers
		if(orderTotal < 0) {
			orderTotal = 0;
		}

		//Clear the order list if the list is empty now.
		if(currOrder.length == 0) {
			toggleEditMode();
			$('.order-overview .overview').empty();
			$('.btn#order').show();
			$('.btn#submit-order-btn').hide();
		}

		//Remove the item from the overview screen
		$('.order-overview .overview .item[data-id="' + uniqueID + '"]').hide(function() {
			$(this).remove()
		});

		//Update the totals and other information
		updateTotals();

		//Show the edit buttons now
		$('.order-overview .overview .edit-item-in-order').show();
		$('.order-overview .overview .remove-item-from-order').show();
	}

	//Toggles the edit view
	function toggleEditMode() {
		if(!editMode) {
			$('#edit-order').html("cancel editing")
			$('.order-overview .overview .remove-item-from-order').fadeIn();
			$('.order-overview .overview .edit-item-in-order').fadeIn();
			editMode = true;
		} else {
			$('#edit-order').html("edit <i class=\"fas fa-edit\"></i>")
			$('.order-overview .overview .remove-item-from-order').fadeOut();
			$('.order-overview .overview .edit-item-in-order').fadeOut();
			editMode = false;
		}
	}

	function updateTotals() {
		//Update the order button based on the order length
		if(currOrder.length > 0) {
			$('#order').removeClass('disabled'); // make the order button green when an order has items in it
			$('.btn#order .qty').html(' (' + currOrder.length + ')');
			$('.btn#order').css('transform', 'scale(1.3)')
			setTimeout(function() {
				$('.btn#order').css('transform', 'scale(1.0)');
			}, 150);
		} else {
			$('#order').addClass('disabled');
			$('.btn#order .qty').html('');
			$(".order-overview").fadeOut();
		}
	}

	//Returns a unique ID for an attribute.
	function getID() {
		var text = "";
		var values = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
		for(var i = 0; i < 10; i++) {
			text += values.charAt(Math.floor(Math.random() * values.length));
		}
		return text;
	}

	//Parses the given customization option
	function parseOption(option) {
		var split = option.split("-");
		var toReturn = '';

		split.forEach(function(element) {

			toReturn = toReturn + ' ' + element.charAt(0).toUpperCase() + element.slice(1);;
		});
		return toReturn;
	}

	// Shows the item modal.
	function showModal() {
		var id = $(this).attr('id');
		let item = menuItems.find(function(obj) {
			return obj.id == id;
		});

		// If the item we clicked on is found in our data, then
		// we can open the modal and populate it with the data 
		// associated with that items id.
		if(typeof item != "undefined") {
			$.featherlight($('.popup-modal #item'), {});
			var modal = '.featherlight-content #item';
			$('.featherlight-content #item').parent().parent().hide();
			$(modal + ' h1').html(item['title']);
			$(modal + ' h2.cost').html('$' + item['price']);
			$(modal + ' .row .description').html(item['description']);
			$(modal + ' .row .nutrition').html('<i class="fas fa-fire"></i> Calories: ' + item['calories']);
			$(modal + ' .image').css('background-image', 'url("img/' + item['photoName'] + '.jpg")');
			// $(modal + ' #add-item-to-order').attr('data-id', item['id']);

			// Create the customization options
			var customizations = Object.keys(item['customizations']);

			// Populate the customizations
			$(modal + ' .row .customizations .checkboxes').html('');
			$(modal + ' .row .customizations .text-field').html('');

			customizations.forEach(function(option) {
				var newOption = parseOption(option);
				$(modal + ' .row .customizations .checkboxes').append(
					'<label class="button-container">' + newOption +
					'<input type="checkbox" name="type" value="' + newOption + '">' +
					'<span class="checkmark"></span>' +
					'</label>'
				);

			});

			$(modal + ' .row .customizations .text-field').append(
				'<h3>Special requirements</h3>' +
				'<textarea id="requirements"></textarea>'
			);
			$(modal + ' .row .customizations').hide();

			// Hide the submit button
			$(modal + ' #submit-order').attr('data-id', id);
			$(modal + ' #submit-order').hide();
			$('.featherlight-content #item').parent().parent().fadeIn(300);
		}
	}

	// Shows the item modal, in edit mode.
	function showEditModal(id, uniqueID) {

		wasModalEdited = false;
    
		// Remove the old item and add back the edited version.
		var itemIndex = uniqueItemIDs.indexOf(uniqueID);
		var itemToRemove = currOrder[itemIndex];

		//Get the requirements, if any, and the id.
		var specialRequirement = specialRequirements[itemIndex];
		let item = menuItems.find(function(obj) {
			return obj.id == id;
		});

		// If the item we clicked on is found in our data, then
		// we can open the modal and populate it with the data 
		// associated with that items id.
		if(typeof item != "undefined") {

			$.featherlight($('.popup-modal #item'), {
				// closeOnClick: false,
				// closeOnEsc: false,
				afterClose: function(event) {
					//Remove the item from the overview screen
					if(wasModalEdited){
						//Remove the item from the arrays if the modal was edited and the "submit" button was clicked
						$('.order-overview .overview .item[data-id="' + uniqueID + '"]').hide(function() {
							$(this).remove()
						});
						orderTotal -= itemToRemove['price'];
						$('.order-overview .total h2').html('$' + Math.floor(orderTotal * 100) / 100);
						currOrder.splice(itemIndex, 1);
						uniqueItemIDs.splice(itemIndex, 1);
						orderCustomizations.splice(itemIndex, 1);
						specialRequirements.splice(itemIndex, 1);
					}
					
					//Update the totals and other information
					updateTotals();

					//Show the edit buttons now
					$('.order-overview .overview .edit-item-in-order').show();
					$('.order-overview .overview .remove-item-from-order').show();
				}
			});
			var modal = '.featherlight-content #item';
			$('.featherlight-content #item').parent().parent().hide();
			// $('.featherlight-close-icon').hide();
			$(modal + ' h1').html(item['title']);
			$(modal + ' h2.cost').html('$' + item['price']);
			$(modal + ' .image').css('background-image', 'url("img/' + item['photoName'] + '.jpg")');
			$('.featherlight-content #item .row .nutrition').hide();
			$('.featherlight-content #item .row .description').hide();
			$('.featherlight-content #item #add-item-to-order').hide();
			$('.featherlight-content #item #submit-order').show();

			// Create the customization options
			var customizations = Object.keys(item['customizations']);

			// Populate the customizations
			$(modal + ' .row .customizations .checkboxes').html('');
			$(modal + ' .row .customizations .text-field').html('');

			// Add the customization options and check off the desired ones.
			customizations.forEach(function(option) {
				var newOption = parseOption(option);
				var checkedOff = orderCustomizations[itemIndex].includes(newOption);
				$(modal + ' .row .customizations .checkboxes').append(
					'<label class="button-container">' + newOption +
						'<input type="checkbox" name="type" value="' + newOption + '">' +
						'<span class="checkmark"></span>' +
					'</label>'
				);

				// Check off the appropriate options.
				if(checkedOff) {
					$(modal + ' .row .customizations .checkboxes .button-container input[value=\'' + newOption + '\']').prop("checked", true);
				}

			});

			// Add the special requirements
			$(modal + ' .row .customizations .text-field').append(
				'<h3>Special requirements</h3>' +
				'<textarea id="requirements">' + specialRequirement + '</textarea>'
			);
			$(modal + ' .row .customizations').show();

			// Show the submit button
			$(modal + ' #submit-order').attr('data-id', id);
			$(modal + ' #submit-order').show();
			$('.featherlight-content #item').parent().parent().fadeIn(800);
			$('.featherlight-content #item').parent().parent().attr('style', 'z-index: 3000 !important');
			
		}
	}

});
