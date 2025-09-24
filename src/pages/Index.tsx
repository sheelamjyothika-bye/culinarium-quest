import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeDetail } from "@/components/RecipeDetail";
import { CuisineExplorer } from "@/components/CuisineExplorer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Heart, TrendingUp, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import pastaImage from "@/assets/pasta-dish.jpg";
import asianImage from "@/assets/asian-stir-fry.jpg";
import dessertImage from "@/assets/chocolate-dessert.jpg";

// Mock data for demonstration
const mockRecipes = [
  {
    id: 1,
    title: "Creamy Garlic Parmesan Pasta",
    image: pastaImage,
    readyInMinutes: 25,
    servings: 4,
    rating: 4.8,
    cuisines: ["Italian", "Comfort Food"],
    summary: "Rich and creamy pasta dish with garlic, parmesan, and fresh herbs. Perfect for a cozy dinner.",
    difficulty: "Easy" as const,
    ingredients: [
      "1 lb fettuccine pasta",
      "4 cloves garlic, minced",
      "1 cup heavy cream",
      "1 cup parmesan cheese, grated",
      "2 tbsp butter",
      "Fresh parsley for garnish",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook pasta according to package directions until al dente. Reserve 1 cup pasta water before draining.",
      "In a large skillet, melt butter over medium heat. Add minced garlic and sauté for 1 minute.",
      "Pour in heavy cream and bring to a gentle simmer. Let it cook for 2-3 minutes to thicken slightly.",
      "Add cooked pasta to the skillet and toss to combine. Add parmesan cheese gradually.",
      "If needed, add reserved pasta water to achieve desired consistency.",
      "Season with salt and pepper. Garnish with fresh parsley and serve immediately."
    ],
    nutrition: {
      calories: 520,
      protein: "18g",
      carbs: "62g", 
      fat: "22g"
    }
  },
  {
    id: 2,
    title: "Asian Vegetable Stir-Fry",
    image: asianImage,
    readyInMinutes: 15,
    servings: 3,
    rating: 4.6,
    cuisines: ["Asian", "Healthy"],
    summary: "Quick and nutritious vegetable stir-fry with a savory Asian-inspired sauce.",
    difficulty: "Easy" as const,
    ingredients: [
      "2 cups mixed vegetables (bell peppers, broccoli, carrots)",
      "2 tbsp vegetable oil",
      "3 cloves garlic, minced",
      "1 tbsp fresh ginger, grated",
      "3 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tsp cornstarch",
      "Green onions for garnish"
    ],
    instructions: [
      "Heat vegetable oil in a large wok or skillet over high heat.",
      "Add garlic and ginger, stir-fry for 30 seconds until fragrant.",
      "Add vegetables and stir-fry for 3-4 minutes until crisp-tender.",
      "Mix soy sauce, sesame oil, and cornstarch in a small bowl.",
      "Pour sauce over vegetables and toss to coat evenly.",
      "Cook for another minute until sauce thickens. Garnish with green onions."
    ],
    nutrition: {
      calories: 180,
      protein: "5g",
      carbs: "15g",
      fat: "12g"
    }
  },
  {
    id: 3,
    title: "Decadent Chocolate Lava Cake",
    image: dessertImage,
    readyInMinutes: 35,
    servings: 2,
    rating: 4.9,
    cuisines: ["French", "Dessert"],
    summary: "Individual chocolate cakes with a molten center, served with fresh berries and mint.",
    difficulty: "Medium" as const,
    ingredients: [
      "4 oz dark chocolate, chopped",
      "4 tbsp unsalted butter",
      "2 large eggs",
      "2 tbsp granulated sugar",
      "2 tbsp all-purpose flour",
      "Pinch of salt",
      "Butter for ramekins",
      "Fresh berries for serving"
    ],
    instructions: [
      "Preheat oven to 425°F. Butter two 6-oz ramekins and dust with cocoa powder.",
      "Melt chocolate and butter in a double boiler until smooth. Let cool slightly.",
      "In a bowl, whisk eggs and sugar until thick and pale.",
      "Fold in the chocolate mixture, then gently fold in flour and salt.",
      "Divide batter between prepared ramekins. Bake for 12-14 minutes.",
      "Let cool for 1 minute, then invert onto plates. Serve with fresh berries."
    ],
    nutrition: {
      calories: 380,
      protein: "8g",
      carbs: "32g",
      fat: "26g"
    }
  }
];

const Index = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof mockRecipes[0] | null>(null);
  const [searchResults, setSearchResults] = useState<typeof mockRecipes>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleSearch = (ingredients: string[], searchTerm: string) => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      // Filter recipes based on search criteria
      let results = mockRecipes;
      
      if (searchTerm) {
        results = results.filter(recipe => 
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.summary.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (ingredients.length > 0) {
        results = results.filter(recipe =>
          ingredients.some(ingredient =>
            recipe.ingredients.some(recipeIngredient =>
              recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
            )
          )
        );
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handleCuisineSelect = (cuisine: string) => {
    setActiveFilter(cuisine);
    const results = mockRecipes.filter(recipe =>
      recipe.cuisines.some(c => c.toLowerCase().includes(cuisine.toLowerCase()))
    );
    setSearchResults(results);
  };

  const handleViewDetails = (recipe: typeof mockRecipes[0]) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <RecipeDetail recipe={selectedRecipe} onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-8">
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ChefHat className="h-8 w-8" />
              <h1 className="text-5xl md:text-6xl font-bold">RecipeQuest</h1>
            </div>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
              Discover amazing recipes from your ingredients and explore world cuisines
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Search
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Heart className="h-3 w-3 mr-1" />
                Save Favorites
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending Recipes
              </Badge>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto animate-scale-in">
            <SearchBar onSearch={handleSearch} className="text-left" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Active Filter */}
        {activeFilter && (
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">
              {activeFilter} Recipes
            </h2>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveFilter(null);
                setSearchResults([]);
              }}
            >
              Clear Filter
            </Button>
          </div>
        )}

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Searching for delicious recipes...</p>
          </div>
        )}

        {searchResults.length > 0 && !isSearching && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">
              {activeFilter ? `${activeFilter} Recipes` : "Search Results"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </section>
        )}

        {/* Cuisine Explorer */}
        {searchResults.length === 0 && !isSearching && (
          <CuisineExplorer onCuisineSelect={handleCuisineSelect} />
        )}

        {/* Featured Recipes */}
        {searchResults.length === 0 && !isSearching && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Featured Recipes</h2>
              <p className="text-muted-foreground">
                Try these popular recipes from our community
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Index;