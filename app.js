
// ----------------------------------
// STARTER COCKTAIL RECIPES
// ----------------------------------

const starterRecipes = [
  {
    id: 1,
    name: "Passionfruit Margarita",
    spirit: "Tequila",
    flavor: "Fruity",
    glass: "Coupe",
    calories: 145,
    ingredients: ["2 oz tequila", "1 oz lime juice", "½ oz passionfruit liqueur", "½ oz simple syrup"],
    instructions: "Shake all ingredients with ice. Strain into a chilled glass.",
    notes: "Garnish with a lime wheel.",
    color: "peach",
    emoji: "🍹"
  },
  {
    id: 2,
    name: "Espresso Martini",
    spirit: "Vodka",
    flavor: "Sweet",
    glass: "Martini",
    calories: 190,
    ingredients: ["2 oz vodka", "1 oz espresso", "½ oz coffee liqueur", "½ oz simple syrup"],
    instructions: "Shake vigorously with ice until foamy. Double strain into a chilled martini glass.",
    notes: "Garnish with three coffee beans.",
    color: "yellow",
    emoji: "☕"
  },
  {
    id: 3,
    name: "Paloma",
    spirit: "Tequila",
    flavor: "Citrusy",
    glass: "Highball",
    calories: 160,
    ingredients: ["2 oz tequila", "½ oz lime juice", "Grapefruit soda", "Pinch of salt"],
    instructions: "Build over ice in a glass. Top with grapefruit soda and stir gently.",
    notes: "A salted rim is optional.",
    color: "pink",
    emoji: "🍊"
  },
  {
    id: 4,
    name: "French 75",
    spirit: "Gin",
    flavor: "Citrusy",
    glass: "Flute",
    calories: 165,
    ingredients: ["1 oz gin", "½ oz lemon juice", "½ oz simple syrup", "3 oz sparkling wine"],
    instructions: "Shake gin, lemon, and syrup with ice. Strain into a glass and top with sparkling wine.",
    notes: "Keep the sparkling wine cold.",
    color: "pink",
    emoji: "🥂"
  },
  {
    id: 5,
    name: "Mojito",
    spirit: "Rum",
    flavor: "Herbal",
    glass: "Highball",
    calories: 170,
    ingredients: ["2 oz white rum", "¾ oz lime juice", "½ oz simple syrup", "8 mint leaves", "Club soda"],
    instructions: "Gently press mint with lime and syrup. Add rum and ice, top with club soda, and stir.",
    notes: "Avoid shredding the mint.",
    color: "green",
    emoji: "🍃"
  },
  {
    id: 6,
    name: "Whiskey Sour",
    spirit: "Whiskey",
    flavor: "Citrusy",
    glass: "Rocks",
    calories: 180,
    ingredients: ["2 oz bourbon", "¾ oz lemon juice", "¾ oz simple syrup"],
    instructions: "Shake all ingredients with ice. Strain over fresh ice.",
    notes: "Egg white is optional.",
    color: "yellow",
    emoji: "🍋"
  }
];


// ----------------------------------
// DATA STORAGE
// ----------------------------------

const STORAGE_KEY = "cocktail-library-recipes-v1";
const FAVORITES_KEY = "cocktail-library-favorites-v1";

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Could not load saved data:", error);
  }

  return fallback;
}

let recipes = loadData(STORAGE_KEY, starterRecipes);
let favorites = loadData(FAVORITES_KEY, []);
let pantry = [];

let favoritesOnly = false;
let matchingIngredients = null;


// ----------------------------------
// PAGE ELEMENTS
// ----------------------------------

const grid = document.getElementById("recipe-grid");
const searchInput = document.getElementById("search-input");
const spiritFilter = document.getElementById("spirit-filter");
const flavorFilter = document.getElementById("flavor-filter");
const sortFilter = document.getElementById("sort-filter");

const recipeDialog = document.getElementById("recipe-dialog");
const detailDialog = document.getElementById("detail-dialog");


// ----------------------------------
// SAVE DATA
// ----------------------------------

function saveLocalData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}


// ----------------------------------
// DISPLAY RECIPES
// ----------------------------------

function renderRecipes() {
  let visibleRecipes = recipes.slice();

  const searchTerm = searchInput.value.trim().toLowerCase();
  const spirit = spiritFilter.value;
  const flavor = flavorFilter.value;

  // Search by name or ingredient
  if (searchTerm) {
    visibleRecipes = visibleRecipes.filter(recipe => {
      let searchableText = [
        recipe.name,
        recipe.spirit,
        recipe.flavor,
        ...(recipe.ingredients || [])
      ].join(" ").toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }

  // Filter by spirit
  if (spirit) {
    visibleRecipes = visibleRecipes.filter(recipe => recipe.spirit === spirit);
  }

  // Filter by flavor
  if (flavor) {
    visibleRecipes = visibleRecipes.filter(recipe => recipe.flavor === flavor);
  }

  // Show favorites only
  if (favoritesOnly) {
    visibleRecipes = visibleRecipes.filter(recipe =>
      favorites.includes(recipe.id)
    );
  }

  // Match selected ingredients
  if (matchingIngredients) {
    visibleRecipes = visibleRecipes.filter(recipe => {
      const recipeText = (recipe.ingredients || []).join(" ").toLowerCase();

      return matchingIngredients.every(ingredient =>
        recipeText.includes(ingredient)
      );
    });
  }

  // Sort recipes
  if (sortFilter.value === "name") {
    visibleRecipes.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortFilter.value === "newest") {
    visibleRecipes.sort((a, b) => b.id - a.id);
  }

  // Update recipe count
  document.getElementById("recipe-count").textContent =
    `${recipes.length} ${recipes.length === 1 ? "recipe" : "recipes"}`;

  // Update results text
  let resultsText = `Showing ${visibleRecipes.length} of ${recipes.length} cocktails`;

  if (favoritesOnly) {
    resultsText = "Showing your favorites";
  }

  if (matchingIngredients) {
    resultsText = "Showing ingredient matches";
  }

  document.getElementById("results-label").textContent = resultsText;

  // Clear old cards
  grid.innerHTML = "";

  document.getElementById("empty-state").classList.toggle(
    "hidden",
    visibleRecipes.length > 0
  );

  // Create a card for every recipe
  visibleRecipes.forEach(recipe => {
    const card = document.createElement("article");
    card.className = "recipe-card";

    const art = document.createElement("div");
    art.className = `card-art ${recipe.color || "green"}`;

    const emoji = document.createElement("span");
    emoji.className = "drink-emoji";
    emoji.textContent = recipe.emoji || "🍸";
    art.appendChild(emoji);

    // Favorite button
    const heart = document.createElement("button");

    heart.className = "card-heart";

    if (favorites.includes(recipe.id)) {
      heart.classList.add("saved");
      heart.textContent = "♥";
    } else {
      heart.textContent = "♡";
    }

    heart.addEventListener("click", () => {
      toggleFavorite(recipe.id);
    });

    art.appendChild(heart);

    // Recipe information
    const body = document.createElement("div");
    body.className = "card-body";

    const meta = document.createElement("div");
    meta.className = "card-meta";

    const spirit = document.createElement("span");
    spirit.textContent = recipe.spirit || "Other";

    const calories = document.createElement("span");
    calories.textContent = recipe.calories
      ? `${recipe.calories} cal`
      : "Recipe";

    meta.append(spirit, calories);

    const title = document.createElement("h3");
    title.textContent = recipe.name;

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = (recipe.ingredients || [])
      .slice(0, 3)
      .join(" · ");

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = recipe.flavor || "Cocktail";

    const view = document.createElement("button");
    view.className = "view-link";
    view.textContent = "View recipe →";

    view.addEventListener("click", () => {
      showRecipe(recipe.id);
    });

    footer.append(tag, view);
    body.append(meta, title, description, footer);
    card.append(art, body);

    grid.appendChild(card);
  });
}


// ----------------------------------
// FAVORITES
// ----------------------------------

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favoriteId => favoriteId !== id);
  } else {
    favorites.push(id);
  }

  saveLocalData();
  renderRecipes();
}


// ----------------------------------
// RECIPE DETAILS
// ----------------------------------

function showRecipe(id) {
  const recipe = recipes.find(item => item.id === id);

  if (!recipe) {
    return;
  }

  const detail = document.getElementById("detail-content");
  detail.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = recipe.name;

  const meta = document.createElement("p");
  meta.textContent = `${recipe.spirit} · ${recipe.flavor}`;

  const glass = document.createElement("p");
  glass.textContent = recipe.glass
    ? `Serve in a ${recipe.glass} glass.`
    : "";

  if (recipe.calories) {
    glass.textContent += ` Approximately ${recipe.calories} calories.`;
  }

  const ingredientsHeading = document.createElement("h3");
  ingredientsHeading.textContent = "Ingredients";

  const list = document.createElement("ul");

  (recipe.ingredients || []).forEach(ingredient => {
    const item = document.createElement("li");
    item.textContent = ingredient;
    list.appendChild(item);
  });

  const instructionsHeading = document.createElement("h3");
  instructionsHeading.textContent = "Instructions";

  const instructions = document.createElement("p");
  instructions.textContent = recipe.instructions || "No instructions added yet.";

  detail.append(
    meta,
    heading,
    glass,
    ingredientsHeading,
    list,
    instructionsHeading,
    instructions
  );

  if (recipe.notes) {
    const notesHeading = document.createElement("h3");
    notesHeading.textContent = "Notes";

    const notes = document.createElement("p");
    notes.textContent = recipe.notes;

    detail.append(notesHeading, notes);
  }

  detailDialog.showModal();
}


// ----------------------------------
// SEARCH AND FILTERS
// ----------------------------------

searchInput.addEventListener("input", renderRecipes);
spiritFilter.addEventListener("change", renderRecipes);
flavorFilter.addEventListener("change", renderRecipes);
sortFilter.addEventListener("change", renderRecipes);

document.getElementById("clear-filters").addEventListener("click", () => {
  searchInput.value = "";
  spiritFilter.value = "";
  flavorFilter.value = "";
  favoritesOnly = false;
  matchingIngredients = null;

  document.getElementById("match-note").textContent =
    "We'll find recipes using your selected ingredients.";

  renderRecipes();
});

document.getElementById("show-favorites").addEventListener("click", event => {
  event.preventDefault();

  favoritesOnly = true;
  matchingIngredients = null;

  renderRecipes();

  document.getElementById("collection").scrollIntoView({
    behavior: "smooth"
  });
});


// ----------------------------------
// ADD A RECIPE
// ----------------------------------

document.getElementById("add-recipe-top").addEventListener("click", () => {
  recipeDialog.showModal();
});

document.getElementById("close-dialog").addEventListener("click", () => {
  recipeDialog.close();
});

document.getElementById("close-detail").addEventListener("click", () => {
  detailDialog.close();
});

document.getElementById("recipe-form").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);

  const ingredients = String(data.get("ingredients"))
    .split("\n")
    .map(item => item.trim())
    .filter(Boolean);

  const recipe = {
    id: Date.now(),
    name: String(data.get("name")).trim(),
    spirit: data.get("spirit"),
    flavor: data.get("flavor"),
    glass: String(data.get("glass")).trim(),
    calories: Number(data.get("calories")) || null,
    ingredients: ingredients,
    instructions: String(data.get("instructions")).trim(),
    notes: String(data.get("notes")).trim(),
    color: "green",
    emoji: "🍸"
  };

  recipes.push(recipe);

  saveLocalData();

  form.reset();
  recipeDialog.close();

  favoritesOnly = false;
  matchingIngredients = null;

  searchInput.value = "";
  spiritFilter.value = "";
  flavorFilter.value = "";

  renderRecipes();
});


// ----------------------------------
// INGREDIENT PANTRY
// ----------------------------------

function renderPantry() {
  const chips = document.getElementById("pantry-chips");

  chips.innerHTML = "";

  if (pantry.length === 0) {
    const hint = document.createElement("span");
    hint.className = "muted-hint";
    hint.textContent = "Your ingredients will appear here.";

    chips.appendChild(hint);
    return;
  }

  pantry.forEach((ingredient, index) => {
    const chip = document.createElement("span");
    chip.className = "ingredient-chip";

    const name = document.createTextNode(ingredient);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "×";

    remove.addEventListener("click", () => {
      pantry.splice(index, 1);
      renderPantry();
    });

    chip.append(name, remove);
    chips.appendChild(chip);
  });
}


function addPantryIngredient() {
  const input = document.getElementById("pantry-input");

  const value = input.value.trim().toLowerCase();

  if (value && !pantry.includes(value)) {
    pantry.push(value);
  }

  input.value = "";
  renderPantry();
  input.focus();
}


document.getElementById("add-ingredient").addEventListener("click", () => {
  addPantryIngredient();
});

document.getElementById("pantry-input").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    addPantryIngredient();
  }
});


document.getElementById("find-matches").addEventListener("click", () => {
  if (pantry.length === 0) {
    document.getElementById("match-note").textContent =
      "Add at least one ingredient first.";
    return;
  }

  matchingIngredients = pantry.slice();
  favoritesOnly = false;

  searchInput.value = "";
  spiritFilter.value = "";
  flavorFilter.value = "";

  document.getElementById("match-note").textContent =
    "Showing recipes that contain every selected ingredient.";

  renderRecipes();

  document.getElementById("collection").scrollIntoView({
    behavior: "smooth"
  });
});


// ----------------------------------
// INITIALIZE WEBSITE
// ----------------------------------

renderRecipes();
