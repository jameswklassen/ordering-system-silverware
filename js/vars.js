const menuItems = [{
    'id': 0,
    'title': 'Hamburger',
    'photoName': 'hamburger',
    'price': 14.99,
    'category': 'entree',
    'description': 'The classic hamburger. Have it served just the way you like it! Papa Roller\'s only uses Grade A Canadian beef. This is a must have classic. Choose from a variety of customizations, such as: ketchup, mustard, onions and pickles.',
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
    'description': 'Ah yes! The BLT, the absolute classic sandwich. Available at restaurants worldwide, but the Papa Roller twist is a MUST try. This delicious entree consists of a bacon, lettuce and tomato heaven. Served with your choice of: ketchup and turkey.',
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
    'description': 'The classic american comfort food, made by the legendary Papa Roller. This mac and cheese recipe has been passed down from Roller to Roller and you can discover the mythos behind it today! Served optionally with ketchup, this is a must try item. Ooey gooey cheesy goodness!',
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
    'description': 'Creamy blueberry ice cream is a summer treat that you simply need to taste to believe. This is a simple delectable treat, made fresh in Papa\'s kitchen! Give it a try today, your taste buds will thank you. This is a perfect dessert to have after your Steak or Hamburger. Served optionally with a caramel drizzle.',
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
    'description': 'A simple dessert. Berries + Whipped Cream. So simple and so delicious. The Papa did not disappoint. Give this a try today, made fresh right here in the Roller house. This dessert is the perfect palette cleanser for any one of our mouthwatering entrees.',
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
    'description': 'Papa Roller makes cakes too? No way. This is a must try menu item. The same simple, elegant, and crispy ice cream made right in Papa\'s kitchen, doing double duty as a cake. What more could one ask for? Give this treat a try today, we know you won\'t regret it.',
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
    'description': '"Have some ice cream and really enjoy it, rather than eating a tub of sugary frozen yogurt!" -Papa Roller. We were born and raised on the Papa Roller philosophy and he\'s been saying this for as long as we can remember. So why not enjoy the crispy, simple and elegant ice cream that the Papa has been dishing out for years. Made right here in Papa\'s kitchen.',
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
    'description': 'Like Steak? Like Fish? Like Salmon? You won\'t be dissapointed at the latest addition to the Papa Roller name. This flaky, tender and delicious menu offering will leave your mouth watering for more. This Salmon is caught from the river by the Papa himself, yes, he goes fishing every Saturday.',
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
    'description': 'What else would one need after a long hard day at the office? A cold beer to crack with the boys. In Papa\'s home, we always have plenty of beer. Brewed right here, by Papa Roller himself. Our Cold Beer is one of our most popular and refreshing beverages.',
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
    'description': 'Papa Roller\'s is bringing fresh and wild new menu items like this hot take. Enjoy Papa\'s in house brew of Tulsi green tea. This is an enjoyable drink for tea lovers everywhere, it puts a new twist on the classic green tea. This isn\'t your everyday green tea, this tea will leave you wishing everyone the best.',
    'calories': 5,
    'popularity': 2,
    'customizations': {}
},
{
    'id': 14,
    'title': 'Avocado Toast',
    'photoName': 'avocado-bread',
    'price': 8.99,
    'category': 'starter',
    'description': 'Avocado Toast is a brilliant example of how Papa Roller is changing the game. Where have you seen this menu item at a restaurant before? That\'s what I\'m saying! Even if you\'ve tried Avocado Toast at your local diner before, you haven\'t tried the magic that is Papa Roller\'s Avocado Toast, so go ahead, live a little, and try this fresh new starter item. Available for a limited time!',
    'calories': 380,
    'popularity': 6,
    'customizations': {
        'spinach': false
    }  
},
{
    'id': 15,
    'title': 'Salmon Cheese Canapes',
    'photoName': 'canapes-cheese',
    'price': 9.99,
    'category': 'starter',
    'description': 'A simple treat, that is a must try in the Roller house. What else could be better than a cracker, cheese and a fresh, thin cut of smoked Salmon. Smoked by Papa Roller himself, this starter item will transport you and all of your guests straight to the paradise that is heaven and back. You won\'t regret ordering this treat!',
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
    'description': 'You ain\'t ever tried salad like this before. This dish will leave you clamoring for more. A real actually healthy treat, not that "salad" that you can buy at other restaurants that ends up being loaded with cheese and bacon. No, this is a truly simple dish that will satisfy all your taste buds. Also under 300 calories!',
    'calories': 297,
    'popularity': 8,
    'customizations': {}    
},
{
    'id': 17,
    'title': 'Ice Tea',
    'photoName': 'ice_tea',
    'price': 8.99,
    'category': 'drink',
    'description': 'Ah yes, the classic "I don\'t want a soft drink and I don\'t want juice either" drink. The one your friends order when everyone else gets the classic Coca Cola or Cold Beer. The middle ground drink that says, "Yes, I am casual, but I know exactly what my taste buds require." If you\'ve been reading the other menu items, then you guessed it. Papa is freshly brewing this drink too.',
    'calories': 400,
    'popularity': 4,
    'customizations': {
        'straw' : false,
        'ice' : false
    }    
},
{
    'id': 18,
    'title': 'Strawberry Kiwi Smoothie',
    'photoName': 'smoothy',
    'price': 9.99,
    'category': 'drink',
    'description': 'Papa makes Smoothies too. This is the perfect companion to your BLT and it tastes great on it\'s own too. Ever since Adam and Eve ate the forbidden fruit, Strawberry and Kiwi has been the perfect pairing for literally anything. Go to safeway and find me a fruit cake that doesn\'t have strawberries and kiwi\'s on it. That\'s right, you can\'t. It\'s a match made in heaven, so of course we made a smoothie out of the iconic duo. The Papa wouldn\'t settle for less.',
    'calories': 500,
    'popularity': 9,
    'customizations': {
        'lemon' : false
    }    
},
{
    'id': 19,
    'title': 'French Vanilla Coffee',
    'photoName': 'french-vanilla',
    'price': 5.99,
    'category': 'drink',
    'description': 'For the coffee drinker that enjoys a little extra sweetness. The Papa brought his A game when crafting this drink. You\'d easily mistake this drink for one of those "high class" coffee shops with "baristas" but this is better, it legitimately tastes amazing, and of course it\'s brewed in house, by Papa Roller. Pair this drink with our wide variety of starters. Whether it\'s day or night, this is a perfect hot beverage. Enjoy it today!',
    'calories': 100,
    'popularity': 9,
    'customizations': {
        'decaf' : false,
        'iced' : false
    }    
},
{
    'id': 20,
    'title': 'Wine',
    'photoName': 'wine',
    'price': 13.99,
    'category': 'drink',
    'description': 'Of course the Papa offers Wine. This is the classic drink that has been raising the roof for centuries. Whether you\'re having a night out with your friends and are enjoying a glass or two, or are on a fancy Tinder date and they order Wine for the table, there simply isn\'t a better match for the Papa\'s entrees. Enjoy a truly fine dining experience when you pair Wine with a Steak.',
    'calories': 100,
    'popularity': 8,
    'customizations': {}    
}
];
