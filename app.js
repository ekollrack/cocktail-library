
const recipeGrid = document.getElementById("recipe-grid");
const searchInput = document.getElementById("search-input");
const spiritFilter = document.getElementById("spirit-filter");
const sortFilter = document.getElementById("sort-filter");
const recipeCount = document.getElementById("recipe-count");
const emptyMessage = document.getElementById("empty-message");

const recipeModal = document.getElementById("recipe-modal");
const closeModal = document.getElementById("close-modal");

const modalMeta = document.getElementById("modal-meta");
const modalTitle = document.getElementById("modal-title");
const modalGlassware = document.getElementById("modal-glassware");
const modalNotes = document.getElementById("modal-notes");
const modalIngredients = document.getElementById("modal-ingredients");
const modalInstructions = document.getElementById("modal-instructions");

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

  // Add a click event to each recipe button
  const recipeButtons = document.querySelectorAll(".view-button");

  for (const button of recipeButtons) {
    button.addEventListener("click", function () {
      const recipeId = Number(button.dataset.id);
      openRecipe(recipeId);
    });
  }
}

// Search, filter, and sort recipes
function filterRecipes() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedSpirit = spiritFilter.value;
  const selectedSort = sortFilter.value;

  let filteredRecipes = [];

  // Find recipes that match the search and spirit filter
  for (const recipe of recipes) {
    const searchableText = (
      recipe.name + " " +
      recipe.spirit + " " +
      recipe.flavor + " " +
      recipe.glassware + " " +
      recipe.ingredients.join(" ") + " " +
      (recipe.notes || "")
    ).toLowerCase();

    const matchesSearch = searchableText.includes(searchText);

    const matchesSpirit =
      selectedSpirit === "All" || recipe.spirit === selectedSpirit;

    if (matchesSearch && matchesSpirit) {
      filteredRecipes.push(recipe);
    }
  }

  // Sort matching recipes
  if (selectedSort === "az") {
    filteredRecipes.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  if (selectedSort === "za") {
    filteredRecipes.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
  }

  if (selectedSort === "spirit") {
    filteredRecipes.sort(function (a, b) {
      const spiritComparison = a.spirit.localeCompare(b.spirit);

      if (spiritComparison !== 0) {
        return spiritComparison;
      }

      return a.name.localeCompare(b.name);
    });
  }

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

  // Display an optional recipe note
  if (recipe.notes) {
    modalNotes.textContent = recipe.notes;
    modalNotes.hidden = false;
  } else {
    modalNotes.textContent = "";
    modalNotes.hidden = true;
  }

  // Add ingredients to the popup
  modalIngredients.innerHTML = "";

  for (const ingredient of recipe.ingredients) {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    modalIngredients.appendChild(listItem);
  }

  recipeModal.hidden = false;
  document.body.style.overflow = "hidden";

  closeModal.focus();
}

// Close the recipe popup
function hideRecipe() {
  recipeModal.hidden = true;
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", hideRecipe);

// Close the popup when clicking outside the recipe
recipeModal.addEventListener("click", function (event) {
  if (event.target === recipeModal) {
    hideRecipe();
  }
});

// Close the popup with the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !recipeModal.hidden) {
    hideRecipe();
  }
});

// Update results whenever a control changes
searchInput.addEventListener("input", filterRecipes);
spiritFilter.addEventListener("change", filterRecipes);
sortFilter.addEventListener("change", filterRecipes);

// Show all cocktails alphabetically when the page loads
filterRecipes();
