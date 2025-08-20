import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface FilterOptions {
  categories: string[];
  varieties: string[];
  priceRange: [number, number];
  sortBy: string;
  inStockOnly: boolean;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalProducts: number;
}

export const ProductFilters = ({ filters, onFiltersChange, totalProducts }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: 'fresh', label: 'Fresh Mangoes', count: 12 },
    { id: 'pulp', label: 'Mango Pulp', count: 6 },
    { id: 'processed', label: 'Processed Products', count: 8 }
  ];

  const varieties = [
    'Alphonso', 'Kesar', 'Tommy Atkins', 'Haden', 'Kent', 'Manila', 'Keitt', 'Francis'
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(c => c !== categoryId);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleVarietyChange = (variety: string, checked: boolean) => {
    const newVarieties = checked
      ? [...filters.varieties, variety]
      : filters.varieties.filter(v => v !== variety);
    
    onFiltersChange({ ...filters, varieties: newVarieties });
  };

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      varieties: [],
      priceRange: [0, 100],
      sortBy: 'popularity',
      inStockOnly: false
    });
  };

  const activeFiltersCount = filters.categories.length + filters.varieties.length + 
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {totalProducts} results
        </p>
        
        <Select value={filters.sortBy} onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value })}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Filters */}
      <div className={`space-y-4 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Category Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, !!checked)}
                  />
                  <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                    {category.label}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Variety Filter */}
        <Card>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Mango Varieties</CardTitle>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3">
                {varieties.map((variety) => (
                  <div key={variety} className="flex items-center space-x-2">
                    <Checkbox
                      id={variety}
                      checked={filters.varieties.includes(variety)}
                      onCheckedChange={(checked) => handleVarietyChange(variety, !!checked)}
                    />
                    <Label htmlFor={variety} className="text-sm font-normal cursor-pointer">
                      {variety}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Stock Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => onFiltersChange({ ...filters, inStockOnly: !!checked })}
              />
              <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">
                In Stock Only
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
};