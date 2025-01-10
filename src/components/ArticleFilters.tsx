import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <Select
        value={selectedCategory}
        onValueChange={onCategoryChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArticleFilters;