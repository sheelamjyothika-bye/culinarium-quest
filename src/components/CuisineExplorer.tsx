import { Globe, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Cuisine {
  name: string;
  flag: string;
  description: string;
  popularDishes: string[];
  color: string;
}

interface CuisineExplorerProps {
  onCuisineSelect: (cuisine: string) => void;
}

const cuisines: Cuisine[] = [
  {
    name: "Italian",
    flag: "🇮🇹",
    description: "Rich pasta dishes, wood-fired pizzas, and fresh Mediterranean flavors",
    popularDishes: ["Pasta", "Pizza", "Risotto", "Gelato"],
    color: "bg-green-500"
  },
  {
    name: "Asian", 
    flag: "🍜",
    description: "Bold spices, fresh ingredients, and diverse cooking techniques",
    popularDishes: ["Stir-fry", "Ramen", "Curry", "Sushi"],
    color: "bg-red-500"
  },
  {
    name: "Mexican",
    flag: "🇲🇽", 
    description: "Vibrant spices, fresh herbs, and comforting traditional dishes",
    popularDishes: ["Tacos", "Enchiladas", "Guacamole", "Salsa"],
    color: "bg-yellow-500"
  },
  {
    name: "French",
    flag: "🇫🇷",
    description: "Elegant techniques, rich sauces, and sophisticated flavors",
    popularDishes: ["Coq au Vin", "Ratatouille", "Croissant", "Soufflé"],
    color: "bg-blue-500"
  },
  {
    name: "Indian",
    flag: "🇮🇳",
    description: "Complex spice blends, aromatic curries, and diverse regional flavors",
    popularDishes: ["Curry", "Biryani", "Naan", "Samosa"],
    color: "bg-orange-500"
  },
  {
    name: "Middle Eastern",
    flag: "🥙",
    description: "Aromatic spices, fresh herbs, and healthy Mediterranean ingredients",
    popularDishes: ["Hummus", "Falafel", "Shawarma", "Tabbouleh"],
    color: "bg-purple-500"
  }
];

export const CuisineExplorer = ({ onCuisineSelect }: CuisineExplorerProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Globe className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Explore World Cuisines</h2>
        </div>
        <p className="text-muted-foreground">
          Discover authentic recipes from around the globe
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cuisines.map((cuisine) => (
          <Card 
            key={cuisine.name}
            className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/30"
            onClick={() => onCuisineSelect(cuisine.name)}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cuisine.flag}</span>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {cuisine.name}
                  </h3>
                </div>
                <MapPin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cuisine.description}
              </p>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Popular Dishes
                </p>
                <div className="flex flex-wrap gap-1">
                  {cuisine.popularDishes.map((dish) => (
                    <Badge 
                      key={dish} 
                      variant="secondary" 
                      className="text-xs bg-primary/10 text-primary border-primary/20"
                    >
                      {dish}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};