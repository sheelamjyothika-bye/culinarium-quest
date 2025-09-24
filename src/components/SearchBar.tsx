import { Search, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, KeyboardEvent } from "react";

interface SearchBarProps {
  onSearch: (ingredients: string[], searchTerm: string) => void;
  className?: string;
}

export const SearchBar = ({ onSearch, className = "" }: SearchBarProps) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addIngredient = () => {
    if (currentInput.trim() && !ingredients.includes(currentInput.trim().toLowerCase())) {
      const newIngredients = [...ingredients, currentInput.trim().toLowerCase()];
      setIngredients(newIngredients);
      setCurrentInput("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    const newIngredients = ingredients.filter(i => i !== ingredient);
    setIngredients(newIngredients);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim()) {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleSearch = () => {
    onSearch(ingredients, searchTerm);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main search input */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for recipes or dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-20 h-12 text-base bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Button 
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
        >
          Search
        </Button>
      </div>

      {/* Ingredient builder */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add ingredients (e.g., chicken, tomato, garlic)..."
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-background/60 backdrop-blur-sm"
          />
          <Button
            onClick={addIngredient}
            disabled={!currentInput.trim()}
            variant="outline"
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Ingredient tags */}
        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <Badge 
                key={ingredient} 
                variant="secondary" 
                className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary border-primary/20"
              >
                {ingredient}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeIngredient(ingredient)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};