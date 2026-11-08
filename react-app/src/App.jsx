
import { useState } from "react";
import "./App.css";

const starterRecipes = [
  {
    id: 1,
    name: "Passionfruit Margarita",
    spirit: "Tequila",
    flavor: "Fruity",
    calories: 145,
    ingredients: ["2 oz tequila", "1 oz lime juice", "½ oz passionfruit liqueur", "½ oz simple syrup"],
    instructions: "Shake all ingredients with ice and strain into a chilled glass.",
    emoji: "🍹"
  },
  {
    id: 2,
    name: "Espresso Martini",
    spirit: "Vodka",
    flavor: "Sweet",
    calories: 190,
    ingredients: ["2 oz vodka", "1 oz espresso", "½ oz coffee liqueur", "½ oz simple syrup"],
    instructions: "Shake vigorously with ice and strain into a chilled martini glass.",
    emoji: "☕"
  },
  {
    id: 3,
    name: "Paloma",
    spirit: "Tequila",
    flavor: "Citrusy",
    calories: 160,
    ingredients: ["2 oz tequila", "½ oz lime juice", "Grapefruit soda", "Pinch of salt"],
    instructions: "Build over ice, top with grapefruit soda, and stir gently.",
    emoji: "🍊"
  },
  {
    id: 4,
    name: "French 75",
    spirit: "Gin",
    flavor: "Citrusy",
    calories: 165,
    ingredients: ["1 oz gin", "½ oz lemon juice", "½ oz simple syrup", "3 oz sparkling wine"],
    instructions: "Shake gin, lemon, and syrup with ice. Strain and top with sparkling wine.",
    emoji: "🥂"
  },
  {
    id: 5,
    name: "Mojito",
    spirit: "Rum",
    flavor: "Herbal",
    calories: 170,
    ingredients: ["2 oz white rum", "¾ oz lime juice", "½ oz simple syrup", "8 mint leaves", "Club soda"],
    instructions: "Gently press mint with lime and syrup. Add rum and ice, top with soda.",
    emoji: "🌿"
  },
  {
    id: 6,
    name: "Whiskey Sour",
    spirit: "Whiskey",
    flavor: "Citrusy",
    calories: 180,
    ingredients: ["2 oz bourbon", "¾ oz lemon juice", "¾ oz simple syrup"],
    instructions: "Shake all ingredients with ice and strain over fresh ice.",
    emoji: "🍋"
  }
];

function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("cocktailRecipes");
    return saved ? JSON.parse(saved) : starterRecipes;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("cocktailFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [spirit, setSpirit] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function saveRecipes(updatedRecipes) {
    setRecipes(updatedRecipes);
    localStorage.setItem("cocktailRecipes", JSON.stringify(updatedRecipes));
  }

  function toggleFavorite(id) {
    let updatedFavorites = [];

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favorite) => favorite !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("cocktailFavorites", JSON.stringify(updatedFavorites));
  }

  function addRecipe(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const newRecipe = {
      id: Date.now(),
      name: form.get("name"),
      spirit: form.get("spirit"),
      flavor: form.get("flavor"),
      calories: Number(form.get("calories")),
      ingredients: form.get("ingredients").split("\n"),
      instructions: form.get("instructions"),
      emoji: "🍸"
    };

    saveRecipes([...recipes, newRecipe]);
    setShowForm(false);
  }

  let filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.join(" ").toLowerCase().includes(search.toLowerCase());

    const matchesSpirit = spirit === "All" || recipe.spirit === spirit;
    const matchesFavorite = !favoritesOnly || favorites.includes(recipe.id);

    return matchesSearch && matchesSpirit && matchesFavorite;
  });

  return (
    <div className="app">
      <header className="navbar">
        <a href="#" className="logo">✳ AnnStrength.</a>

        <nav>
          <a href="#collection">Collection</a>
          <a href="#favorites">Favorites</a>
        </nav>

        <button onClick={() => setShowForm(true)}>
          + Add cocktail
        </button>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">A LITTLE MORE SPIRIT.</p>

          <h1>
            Good company. <em>Generous pours.</em>
          </h1>

          <p>
            Inspired by the art of a good host and the magic of a strong drink.
            A place to collect favorite cocktails, discover new recipes,
            and always know what to pour next.
          </p>

          <a href="#collection" className="hero-link">
            Explore the collection ↓
          </a>
        </section>

        <section className="collection" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE ANNSTRENGTH COLLECTION</p>
              <h2>Something to sip on.</h2>
            </div>

            <span>{recipes.length} cocktails</span>
          </div>

          <div className="filters">
            <input
              type="search"
              placeholder="Search cocktails or ingredients..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={spirit}
              onChange={(event) => setSpirit(event.target.value)}
            >
              <option value="All">All spirits</option>
              <option value="Tequila">Tequila</option>
              <option value="Vodka">Vodka</option>
              <option value="Gin">Gin</option>
              <option value="Rum">Rum</option>
              <option value="Whiskey">Whiskey</option>
            </select>

            <button
              className={favoritesOnly ? "active" : ""}
              onClick={() => setFavoritesOnly(!favoritesOnly)}
            >
              ♡ Favorites
            </button>
          </div>

          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
              <article className="recipe-card" key={recipe.id}>
                <div className="recipe-image">
                  <span>{recipe.emoji}</span>

                  <button
                    className="favorite-button"
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    {favorites.includes(recipe.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="recipe-info">
                  <div className="recipe-meta">
                    <span>{recipe.spirit}</span>
                    <span>{recipe.calories} cal</span>
                  </div>

                  <h3>{recipe.name}</h3>

                  <p>{recipe.flavor}</p>

                  <button
                    className="view-button"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    View recipe →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <p className="empty-message">No cocktails found. Try another search!</p>
          )}
        </section>

        <section className="favorites-section" id="favorites">
          <p className="eyebrow">YOUR PERSONAL SHORTLIST</p>
          <h2>Keep the good ones close.</h2>
          <p>Save your favorite cocktails using the heart on each recipe.</p>
        </section>
      </main>

      <footer>
        <span>✳ AnnStrength.</span>
        <span>Good company. Generous pours.</span>
      </footer>

      {showForm && (
        <div className="modal-backdrop">
          <form className="recipe-form" onSubmit={addRecipe}>
            <button
              type="button"
              className="close-button"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <p className="eyebrow">ADD TO YOUR COLLECTION</p>
            <h2>New cocktail</h2>

            <label>Cocktail name</label>
            <input name="name" required placeholder="Cocktail name" />

            <label>Base spirit</label>
            <select name="spirit" required>
              <option value="Tequila">Tequila</option>
              <option value="Vodka">Vodka</option>
              <option value="Gin">Gin</option>
              <option value="Rum">Rum</option>
              <option value="Whiskey">Whiskey</option>
            </select>

            <label>Flavor</label>
            <input name="flavor" placeholder="Fruity, citrusy, etc." />

            <label>Ingredients (one per line)</label>
            <textarea name="ingredients" required rows="4" />

            <label>Instructions</label>
            <textarea name="instructions" rows="3" />

            <label>Calories</label>
            <input name="calories" type="number" />

            <button type="submit" className="submit-button">
              Save cocktail
            </button>
          </form>
        </div>
      )}

      {selectedRecipe && (
        <div className="modal-backdrop">
          <div className="recipe-form">
            <button
              className="close-button"
              onClick={() => setSelectedRecipe(null)}
            >
              ×
            </button>

            <p className="eyebrow">{selectedRecipe.spirit} · {selectedRecipe.flavor}</p>
            <h2>{selectedRecipe.name}</h2>

            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h3>Instructions</h3>
            <p>{selectedRecipe.instructions}</p>

            <button
              className="submit-button"
              onClick={() => setSelectedRecipe(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
