
const recipeGrid = document.getElementById("recipe-grid");
const searchInput = document.getElementById("search-input");
const spiritFilter = document.getElementById("spirit-filter");
const recipeCount = document.getElementById("recipe-count");
const emptyMessage = document.getElementById("empty-message");

const recipeModal = document.getElementById("recipe-modal");
const closeModal = document.getElementById("close-modal");

const modalMeta = document.getElementById("modal-meta");
const modalTitle = document.getElementById("modal-title");
const modalGlassware = document.getElementById("modal-glassware");
const modalIngredients = document.getElementById("modal-ingredients");
const modalInstructions = document.getElementById("modal-instructions");

// Add each spirit to the dropdown menu
const spirits = [];

for (const recipe of recipes) {
  if (!spirits.includes(recipe.spirit)) {
    spirits.push(recipe.spirit);
  }
}

spirits.sort();

for (const spirit of spirits) {
  const option = document.createElement("option");
  option.value = spirit;
  option.textContent = spirit;
  spiritFilter.appendChild(option);
}

// Display the cocktail cards
function displayRecipes(filteredRecipes) {
  recipeGrid.innerHTML = "";

  recipeCount.textContent = `${filteredRecipes.length} cocktails`;

  if (filteredRecipes.length === 0) {
    emptyMessage.hidden = false;
  } else {
    emptyMessage.hidden = true;
  }

  for (const recipe of filteredRecipes) {
    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <div class="recipe-image">
        <span>${recipe.emoji}</span>
      </div>

      <div class="recipe-info">
        <div class="recipe-meta">${recipe.spirit}</div>
        <h3>${recipe.name}</h3>
        <p>${recipe.flavor}</p>
        <button class="view-button" data-id="${recipe.id}">
          View recipe →
        </button>
      </div>
    `;

    recipeGrid.appendChild(card);
  }

  // Open a recipe when its button is clicked
  const recipeButtons = document.querySelectorAll(".view-button");

  for (const button of recipeButtons) {
    button.addEventListener("click", function () {
      const recipeId = Number(button.dataset.id);
      openRecipe(recipeId);
    });
  }
}

// Search and filter cocktails
function filterRecipes() {
  const searchText = searchInput.value.toLowerCase();
  const selectedSpirit = spiritFilter.value;

  const filteredRecipes = recipes.filter(function (recipe) {
    const searchableText = (
      recipe.name + " " +
      recipe.spirit + " " +
      recipe.flavor + " " +
      recipe.ingredients.join(" ")
    ).toLowerCase();

    const matchesSearch = searchableText.includes(searchText);

    const matchesSpirit =
      selectedSpirit === "All" || recipe.spirit === selectedSpirit;

    return matchesSearch && matchesSpirit;
  });

  displayRecipes(filteredRecipes);
}

// Open a recipe popup
function openRecipe(recipeId) {
  const recipe = recipes.find(function (item) {
    return item.id === recipeId;
  });

  if (!recipe) {
    return;
  }

  modalMeta.textContent = recipe.spirit + " · " + recipe.flavor;
  modalTitle.textContent = recipe.name;
  modalGlassware.textContent = recipe.glassware;
  modalInstructions.textContent = recipe.instructions;

  modalIngredients.innerHTML = "";

  for (const ingredient of recipe.ingredients) {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    modalIngredients.appendChild(listItem);
  }

  recipeModal.hidden = false;
  document.body.style.overflow = "hidden";
}

// Close the recipe popup
function hideRecipe() {
  recipeModal.hidden = true;
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", hideRecipe);

recipeModal.addEventListener("click", function (event) {
  if (event.target === recipeModal) {
    hideRecipe();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !recipeModal.hidden) {
    hideRecipe();
  }
});

// Update results when searching or filtering
searchInput.addEventListener("input", filterRecipes);
spiritFilter.addEventListener("change", filterRecipes);

// Show all cocktails when the page first loads
displayRecipes(recipes);
