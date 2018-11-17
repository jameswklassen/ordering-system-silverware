const menuItems = [{
    'id': 0,
    'title': 'Hamburger',
    'photoName': 'hamburger',
    'price': 14.99,
    'category': 'entree',
    'description': 'The classic hamburger. Have it served just the way you like it! Papa Roller\'s only uses Grade A Canadian beef. This is a must have classic. Choose from a variety of customizations, such as: ketchup, mustard, onions and pickes.',
    'calories': 400,
    'popularity': 4,
    'customizations': {
        'Ketchup': false,
        'Mustard': false,
        'Onions': false,
        'Pickles': false
    }
},
{
    'id': 1,
    'title': 'BLT',
    'photoName': 'blt',
    'price': 9.99,
    'category': 'entree',
    'description': 'Ah yes! The BLT, the absolute classic sandwhich. Available at restaurants worldwide, but the Papa Roller twist is a MUST try. This delicious entree consists of a bacon, lettuce and tomato heaven. Served with your choice of: ketchup and turkey.',
    'calories': 300,
    'popularity': 4,
    'customizations': {
        'Ketchup': false,
        'Turkey': false
    }
},
{
    'id': 2,
    'title': 'Steak',
    'photoName': 'steak',
    'price': 19.99,
    'category': 'entree',
    'description': 'Of course we have Steak! It would not be fine dining without it! Come and enjoy our fine Grade A Canadian beef. Served with mushrooms and/or bernay sauce, and cooked to your exact specifications. Come and discover fine dining with Papa Roller.',
    'calories': 600,
    'popularity': 10,
    'customizations': {
        'mushrooms': false,
        'bernay-sauce': false
        // Need to add well done, medium rare, rare, etc.
    }
},
{
    'id': 3,
    'title': 'Mac and Cheese',
    'photoName': 'baked-mac-blur-bowl',
    'price': 13.95,
    'category': 'starter',
    'description': 'The classic american comfort food, made by the legendary Papa Roller. This mac and cheese recipe has been passed down from Roller to Roller and you can discover the mythos behind it today! Served optionally with ketchup, this is a must try item. Ooey gooey cheesey goodness!',
    'calories': 450,
    'popularity': 2,
    'customizations': {
        'ketchup': false
    }
},
{
    'id': 4,
    'title': 'BBQ Chicken',
    'photoName': 'barbecue-bbq-chicken',
    'price': 24.99,
    'category': 'entree',
    'description': 'Chicken + Papa Roller\'s WORLD FAMOUS BBQ SAUCE! Truly a match made in heaven. Try the legendary meal that yelp reviews are raving about! Soft and "melt in your mouth" chicken, combined with the tangy, zesty and sweet BBQ sauce. You\'ve never tasted chicken like this before.',
    'calories': 450,
    'popularity': 10,
    'customizations': {
        'ketchup': false,
        'extra-bbq': false
    }
},
{
    'id': 5,
    'title': 'Blueberry Ice Cream',
    'photoName': 'berries-blackberries-blueberries',
    'price': 10.99,
    'category': 'dessert',
    'description': 'Creamy blueberry ice cream is a summer treat that you simply need to taste to believe. Made fresh in Papa\'s kitchen!',
    'calories': 300,
    'popularity': 5,
    'customizations': {
        'caramel-drizzle': false
    }
},
{
    'id': 6,
    'title': 'Whipped Cream and Berries',
    'photoName': 'berries-bowl-cream',
    'price': 4.99,
    'category': 'dessert',
    'description': 'A simple dessert. Berries + Whipped Cream. So simple and so delicious. The Papa did not dissapoint.',
    'calories': 800,
    'popularity': 10,
    'customizations': {}
},
{
    'id': 7,
    'title': 'Ice Cream Cake',
    'photoName': 'birthday-birthday-cake-cake',
    'price': 20.99,
    'category': 'dessert',
    'description': 'Papa Roller makes cakes too? No way. This is a must try menu item. The same simple, elegant, and crispy ice cream made right in Papa\'s kitchen, doing double duty as a cake. What more could one ask for?',
    'calories': 1000,
    'popularity': 7,
    'customizations': {}
},
{
    'id': 8,
    'title': 'Bowl of Ice Cream',
    'photoName': 'bowl-close-up-dark',
    'price': 3.99,
    'category': 'dessert',
    'description': '"Have half of a cup of ice cream and really enjoy it rather than eating a tub of sugary frozen yogurt!" -Papa Roller. We were born and raised on the Papa Roller mythos and he\'s been saying this for as long as we can remember. So why not enjoy the crispy, simple and elegant ice cream that the Papa has been dishing out for years. Made right here in Papa\'s kitchen.',
    'calories': 240,
    'popularity': 6,
    'customizations': {
        'strawberries': false
    }
},
{
    'id': 9,
    'title': 'Chocolate Cake',
    'photoName': 'cake-chocolate-chocolate-cake',
    'price': 5.99,
    'category': 'dessert',
    'description': 'Chocolate cake made fresh right in the Papa\'s kitchen. Yes, you\'re probably thinking, "How does Papa Roller have the time to do all this fresh cooking?", the answer? The hustle never stops. So yeah, of course we make chocolate cake and we do it right. Come and taste this cocoa delight.',
    'calories': 400,
    'popularity': 8,
    'customizations': {}
},
{
    'id': 10,
    'title': 'Salmon Steak',
    'photoName': 'close-up-cooking-dinner',
    'price': 20.99,
    'category': 'entree',
    'description': 'Like Steak? Like Fish? Like Salmon? You won\'t be dissapointed at the latest addition to the Papa Roller name. This flaky, tender and delicious menu offering will leave your mouth water for more.',
    'calories': 430,
    'popularity': 4,
    'customizations': {
        'dill': false
    }
},
{
    'id': 11,
    'title': 'Coca-Cola',
    'photoName': 'coca-cola-coke-cold',
    'price': 3.99,
    'category': 'drink',
    'description': 'The classic. The classic is in the house. Discover happiness as you combine the mouth-watering flavours of Papa\'s kitchen with the sweet simple taste of carbonated sugar. At Papa Roller\'s we won\'t ask: "Is Pepsi okay?" we have the real stuff, and we\'re not afraid to show it.',
    'calories': 256,
    'popularity': 3,
    'customizations': {
        'ice': false,
        'straw': false
    }
},
{
    'id': 12,
    'title': 'Cold Beer',
    'photoName': 'alcohol-beer-beverage',
    'price': 8.99,
    'category': 'drink',
    'description': 'What else would one need after a long hard day at the office. A cold beer to crack with the boy\'s. In Papa\'s home, we always have plenty of beer. Brewed right here, by Papa Roller himself. Our Cold Beer is our most popular and most refreshing beverages.',
    'calories': 90,
    'popularity': 10,
    'customizations': {}
},
{
    'id': 13,
    'title': 'Tulsi Green Tea',
    'photoName': 'tea',
    'price': 3.99,
    'category': 'drink',
    'description': 'Description',
    'calories': 5,
    'popularity': 2,
    'customizations': {}
},
{
    'id': 14,
    'title': 'Avocado Bread',
    'photoName': 'avocado-bread',
    'price': 8.99,
    'category': 'starter',
    'description': 'Description',
    'calories': 380,
    'popularity': 6,
    'customizations': {}  
},
{
    'id': 15,
    'title': 'Salmon Cheese Canapes',
    'photoName': 'canapes-cheese',
    'price': 9.99,
    'category': 'starter',
    'description': 'Description',
    'calories': 80,
    'popularity': 4,
    'customizations': {}    
},
{
    'id': 16,
    'title': 'Buckwheat Pesto Salad',
    'photoName': 'buckwheat-salad',
    'price': 8.99,
    'category': 'starter',
    'description': 'Description',
    'calories': 297,
    'popularity': 8,
    'customizations': {}    
}
];