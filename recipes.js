
const recipes = [
  {
    id: 1,
    name: "Cosmo",
    spirit: "Vodka",
    flavor: "Fruity & Citrusy",
    glassware: "Martini glass",
    emoji: "🍸",
    ingredients: [
      "2 oz vodka",
      "1 oz orange liqueur",
      "1 oz cranberry juice",
      "½ oz lime juice"
    ],
    instructions: "Shake all ingredients with ice and strain into a chilled martini glass."
  },
  {
    id: 2,
    name: "Margarita",
    spirit: "Tequila",
    flavor: "Citrusy",
    glassware: "Rocks glass",
    emoji: "🍹",
    ingredients: [
      "2 oz tequila",
      "1 oz orange liqueur",
      "1 oz lime juice",
      "½ oz simple syrup or agave (optional)"
    ],
    instructions: "Shake all ingredients with ice. Strain over fresh ice into a glass with a salted rim, if desired."
  },
  {
    id: 3,
    name: "Aperol or Sarti Spritz",
    spirit: "Aperitif",
    flavor: "Bubbly & Bitter",
    glassware: "Wine glass",
    emoji: "🥂",
    ingredients: [
      "3 oz Prosecco",
      "2 oz Aperol or Sarti",
      "1 oz soda water"
    ],
    instructions: "Fill a wine glass with ice. Add Prosecco, Aperol or Sarti, and soda water. Stir gently and garnish with an orange slice."
  },
  {
    id: 4,
    name: "Hugo Spritz",
    spirit: "Elderflower",
    flavor: "Floral & Refreshing",
    glassware: "Wine glass",
    emoji: "🌿",
    ingredients: [
      "4 mint leaves",
      "4 oz Prosecco",
      "1 oz elderflower liqueur",
      "1 oz soda water"
    ],
    instructions: "Gently press the mint leaves in a wine glass. Add ice, Prosecco, elderflower liqueur, and soda water. Stir gently."
  },
  {
    id: 5,
    name: "Mojito",
    spirit: "Rum",
    flavor: "Fresh & Herbal",
    glassware: "Highball glass",
    emoji: "🌱",
    ingredients: [
      "5 mint leaves",
      "2 oz white rum",
      "1 oz lime juice",
      "½ oz simple syrup",
      "Soda water to top"
    ],
    instructions: "Gently muddle the mint with lime juice and simple syrup. Add rum and ice, then top with soda water. Stir gently."
  },
  {
    id: 6,
    name: "Lemon Lavender Mojito",
    spirit: "Rum",
    flavor: "Floral & Citrusy",
    glassware: "Highball glass",
    emoji: "🍋",
    ingredients: [
      "5 mint leaves",
      "2 oz rum",
      "1 oz lemon juice",
      "¾ oz lavender syrup",
      "Soda water to top"
    ],
    instructions: "Gently muddle the mint with lemon juice and lavender syrup. Add rum and ice, then top with soda water. Stir gently."
  },
  {
    id: 7,
    name: "Dirty Shirley",
    spirit: "Vodka",
    flavor: "Sweet",
    glassware: "Highball glass",
    emoji: "🍒",
    ingredients: [
      "2 oz vodka",
      "1 oz grenadine",
      "4 oz Sprite",
      "1 cherry"
    ],
    instructions: "Fill a glass with ice. Add vodka and grenadine, then top with Sprite. Stir gently and garnish with a cherry."
  },
  {
    id: 8,
    name: "St-Germain & Cranberry",
    spirit: "Vodka",
    flavor: "Fruity & Floral",
    glassware: "Rocks glass",
    emoji: "🌸",
    ingredients: [
      "2 oz vodka",
      "1 oz elderflower liqueur",
      "1 oz cranberry juice",
      "½ oz lime juice"
    ],
    instructions: "Shake all ingredients with ice. Strain over fresh ice into a rocks glass."
  },
  {
    id: 9,
    name: "Moscow Mule",
    spirit: "Vodka",
    flavor: "Ginger & Citrusy",
    glassware: "Copper mug",
    emoji: "🫚",
    ingredients: [
      "2 oz vodka",
      "4 oz ginger beer",
      "Squeeze of ¼ lime"
    ],
    instructions: "Fill a copper mug with ice. Add vodka and lime juice, then top with ginger beer. Stir gently."
  },
  {
    id: 10,
    name: "Yoyo",
    spirit: "Gin or Vodka",
    flavor: "Bitter & Citrusy",
    glassware: "Coupe glass",
    emoji: "🍊",
    ingredients: [
      "1½ oz gin or vodka",
      "1½ oz Aperol",
      "1½ oz grapefruit liqueur",
      "1½ oz lemon juice"
    ],
    instructions: "Shake all ingredients with ice. Strain into a chilled coupe glass."
  },
  {
    id: 11,
    name: "Lemon Drop",
    spirit: "Vodka",
    flavor: "Sweet & Citrusy",
    glassware: "Martini glass",
    emoji: "🍋",
    ingredients: [
      "2 oz vodka",
      "1 oz lemon juice",
      "¾ oz triple sec",
      "¾ oz simple syrup"
    ],
    instructions: "Shake all ingredients with ice. Strain into a chilled martini glass. Add a sugar rim if desired."
  },
  {
    id: 12,
    name: "Paloma",
    spirit: "Tequila",
    flavor: "Grapefruit & Citrusy",
    glassware: "Highball glass",
    emoji: "🍊",
    ingredients: [
      "2 oz tequila",
      "2 oz grapefruit juice",
      "2 oz sparkling water",
      "½ oz lime juice"
    ],
    instructions: "Fill a glass with ice. Add tequila, grapefruit juice, and lime juice. Top with sparkling water and stir gently."
  }
];
