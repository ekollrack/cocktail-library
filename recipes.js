const recipes = [
  {
    id: 1,
    name: "Aperol Spritz",
    spirit: "Spritz",
    glassware: "Wine glass",
    ingredients: [
      "3 oz Prosecco",
      "2 oz Aperol",
      "1 oz soda water",
      "Orange slice for garnish"
    ],
    instructions: "Fill a large wine glass with ice. Pour in the Prosecco, followed by the Aperol. Add the soda water and stir. Garnish with an orange slice."
  },
  {
    id: 2,
    name: "Cosmo",
    spirit: "Vodka",
    glassware: "Martini glass",
    ingredients: [
      "2 oz vodka",
      "1 oz orange liqueur",
      "1 oz cranberry juice",
      "1/2 oz fresh lime juice"
    ],
    instructions: "Fill a cocktail shaker with ice. Add the vodka, orange liqueur, cranberry juice, and lime juice. Shake. Strain into a chilled martini glass."
  },
  {
    id: 3,
    name: "Daiquiri",
    spirit: "Rum",
    glassware: "Martini glass",
    ingredients: [
      "2 oz white rum",
      "1 oz fresh lime juice",
      "3/4 oz simple syrup",
      "Lime wheel for garnish"
    ],
    instructions: "Add the rum, lime juice, and simple syrup to a cocktail shaker filled with ice. Shake. Strain into a chilled martini glass and garnish with a lime wheel."
  },
  {
    id: 4,
    name: "Dirty Shirley",
    spirit: "Vodka",
    glassware: "Highball glass",
    ingredients: [
      "2 oz vodka",
      "1 oz grenadine",
      "4 oz Sprite",
      "1 cherry for garnish"
    ],
    instructions: "Fill a tall glass with ice. Add the vodka and grenadine. Top with Sprite and gently stir to combine. Garnish with a cherry and serve with a straw."
  },
  {
    id: 5,
    name: "Gin Collins",
    spirit: "Gin",
    glassware: "Highball glass",
    ingredients: [
      "2 oz gin",
      "1 oz fresh lemon juice",
      "3/4 oz simple syrup",
      "Soda water to top",
      "Lemon slice for garnish"
    ],
    instructions: "Add the gin, lemon juice, and simple syrup to a cocktail shaker filled with ice. Shake. Strain into a tall glass filled with fresh ice. Top with soda water and gently stir. Garnish with a lemon slice."
  },
  {
    id: 6,
    name: "Gimlet",
    spirit: "Gin",
    glassware: "Martini glass",
    ingredients: [
      "2 oz gin",
      "3/4 oz fresh lime juice",
      "3/4 oz simple syrup",
      "Lime wheel for garnish"
    ],
    instructions: "Add the gin, lime juice, and simple syrup to a cocktail shaker filled with ice. Shake. Strain into a chilled martini glass and garnish with a lime wheel."
  },
  {
    id: 7,
    name: "Gin Martini",
    spirit: "Gin",
    glassware: "Martini glass",
    ingredients: [
      "2 1/2 oz gin",
      "1/2 oz dry vermouth",
      "Olive or lemon twist for garnish"
    ],
    instructions: "Fill a mixing glass with ice. Add the gin and dry vermouth. Stir continuously with a bar spoon for about 20–30 seconds until very cold. Strain into a chilled martini glass. Garnish with an olive or a lemon twist."
  },
  {
    id: 8,
    name: "Hugo Spritz",
    spirit: "Spritz",
    glassware: "Wine glass",
    ingredients: [
      "4 mint leaves",
      "4 oz Prosecco",
      "1 oz elderflower liqueur",
      "1 oz soda water",
      "Mint sprig for garnish"
    ],
    instructions: "Slap the mint leaves and place into a wine glass. Fill the glass with ice. Add the elderflower liqueur and Prosecco, then top with soda water. Stir gently and garnish with a mint sprig."
  },
  {
    id: 9,
    name: "Lemon Drop Martini",
    spirit: "Vodka",
    glassware: "Martini glass",
    ingredients: [
      "2 oz vodka",
      "1 oz fresh lemon juice",
      "3/4 oz triple sec",
      "3/4 oz simple syrup",
      "Sugar for the rim (optional)"
    ],
    instructions: "If you want a sugar rim, rub a lemon wedge around the edge of the glass and dip it into a small plate of sugar. Add the vodka, lemon juice, triple sec, and simple syrup to a shaker filled with ice. Shake. Strain into a chilled martini glass."
  },
  {
    id: 10,
    name: "Lemon Lavender Mojito",
    spirit: "Rum",
    glassware: "Highball glass",
    ingredients: [
      "5 mint leaves",
      "2 oz rum",
      "1 oz fresh lemon juice",
      "3/4 oz lavender syrup",
      "Soda water to top"
    ],
    instructions: "Place the mint leaves in a tall glass. Gently press them with a muddler or the back of a wooden spoon to release their aroma without shredding them. Add the rum, lemon juice, and lavender syrup. Fill the glass with ice and stir. Top with soda water and stir gently once more."
  },
  {
    id: 11,
    name: "Margarita",
    spirit: "Tequila",
    glassware: "Rocks glass",
    ingredients: [
      "2 oz tequila",
      "1 oz orange liqueur",
      "1 oz fresh lime juice",
      "1/2 oz simple syrup or agave (optional)",
      "Salt for the rim (optional)",
      "Lime wedge for garnish"
    ],
    instructions: "If you want a salted rim, rub a lime wedge around the edge of the glass and dip it into a plate of salt. Add the tequila, orange liqueur, lime juice, and optional sweetener to a shaker filled with ice. Shake for about 15 seconds until chilled. Strain over fresh ice into your prepared glass and garnish with a lime wedge."
  },
  {
    id: 12,
    name: "Mojito",
    spirit: "Rum",
    glassware: "Highball glass",
    ingredients: [
      "5 mint leaves",
      "2 oz white rum",
      "1 oz fresh lime juice",
      "1/2 oz simple syrup",
      "Soda water to top",
      "Mint sprig for garnish"
    ],
    instructions: "Place the mint leaves and simple syrup in a tall glass. Gently muddle the mint by pressing it with a muddler or the back of a spoon. Add the rum and lime juice. Fill the glass with ice and stir well. Top with soda water and stir gently once more. Garnish with a mint sprig."
  },
  {
    id: 13,
    name: "Moscow Mule",
    spirit: "Vodka",
    glassware: "Copper mug",
    ingredients: [
      "2 oz vodka",
      "4 oz ginger beer",
      "Squeeze of 1/4 lime",
      "Lime wedge for garnish"
    ],
    instructions: "Fill a copper mug or tall glass with ice. Add the vodka and squeeze in the lime juice. Top with ginger beer and gently stir to combine. Garnish with a lime wedge and serve immediately."
  },
  {
    id: 14,
    name: "Mike's Negroni",
    spirit: "Gin",
    glassware: "Rocks glass",
    ingredients: [
      "1 oz gin",
      "1 oz Campari",
      "1 oz sweet vermouth",
      "Orange slice for garnish"
    ],
    instructions: "Fill a rocks glass with ice. Pour in the gin, Campari, and sweet vermouth. Stir with a spoon for about 20 seconds until the drink is chilled. Garnish with an orange slice. A classic Negroni uses equal parts of all three ingredients."
  },
  {
    id: 15,
    name: "Paloma",
    spirit: "Tequila",
    glassware: "Highball glass",
    ingredients: [
      "2 oz tequila",
      "2 oz grapefruit juice",
      "2 oz sparkling water",
      "1/2 oz fresh lime juice",
      "Lime wedge for garnish"
    ],
    instructions: "Fill a shaker with ice. Add the tequila, grapefruit juice, and lime juice. Shake. Top with sparkling water and gently stir once more. Garnish with a lime wedge."
  },
  {
    id: 16,
    name: "Sarti Spritz",
    spirit: "Spritz",
    glassware: "Wine glass",
    ingredients: [
      "3 oz Prosecco",
      "2 oz Sarti",
      "1 oz soda water",
      "Grapefruit or lime slice for garnish"
    ],
    instructions: "Fill a large wine glass with ice. Pour in the Prosecco, followed by the Sarti. Add the soda water and gently stir once or twice. Garnish with a grapefruit or lime slice."
  },
  {
    id: 17,
    name: "St-Germain Cosmo",
    spirit: "Vodka",
    glassware: "Martini glass",
    ingredients: [
      "2 oz vodka",
      "1 oz elderflower liqueur",
      "1 oz cranberry juice",
      "1/2 oz fresh lime juice",
      "Lime wedge for garnish"
    ],
    instructions: "Add the vodka, elderflower liqueur, cranberry juice, and lime juice to a shaker filled with ice. Shake for about 15 seconds until chilled. Strain over fresh ice into a martini glass and garnish with a lime wedge."
  },
  {
    id: 18,
    name: "Vodka Martini",
    spirit: "Vodka",
    glassware: "Martini glass",
    ingredients: [
      "2 1/2 oz vodka",
      "1/2 oz dry vermouth",
      "Olive or lemon twist for garnish"
    ],
    instructions: "Fill a mixing glass with ice. Add the vodka and dry vermouth. Stir continuously with a bar spoon for about 20–30 seconds until very cold. Strain into a chilled martini glass. Garnish with an olive or a lemon twist."
  },
  {
    id: 19,
    name: "Yoyo",
    spirit: "Gin",
    glassware: "Martini glass",
    ingredients: [
      "1 1/2 oz gin",
      "1 1/2 oz Aperol",
      "1 1/2 oz grapefruit liqueur",
      "1 1/2 oz fresh lemon juice"
    ],
    notes: "Vodka can be substituted for gin if preferred.",
    instructions: "Add the gin, Aperol, grapefruit liqueur, and lemon juice to a cocktail shaker filled with ice. Shake vigorously for about 15 seconds until cold. Strain into a martini glass."
  }
];