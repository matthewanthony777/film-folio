import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ArticleFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  selectedCategory: string;
}

const CATEGORIES = [
  "All Categories",
  "Film Reviews",
  "Film & TV",
  "Classic Cinema",
  "Film Fashion",
  "Film Festivals",
  "Cinematography",
  "Screenwriting",
  "Film Technology",
  "Actor Spotlights",
  "Film History",
  "Behind-the-Scenes",
  "International Cinema",
];

const ArticleFilters = ({
  onSearchChange,
  onCategoryChange,
  selectedCategory,
}: ArticleFiltersProps) => {
  return (
    <div className="space-y-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          className="pl-10"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full overflow-x-auto pb-2">
        <ToggleGroup
          type="single"
          value={selectedCategory}
          onValueChange={(value) => {
            if (value) onCategoryChange(value);
          }}
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((category) => (
            <ToggleGroupItem
              key={category}
              value={category}
              size="sm"
              variant="outline"
              className="whitespace-nowrap"
            >
              {category}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ArticleFilters;