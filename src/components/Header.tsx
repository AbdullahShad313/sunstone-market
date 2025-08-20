import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCartClick: () => void;
}

export const Header = ({ onSearch, onCartClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-mango-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🥭</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Sunstone Market</h1>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for mangoes, pulp, juices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-1 top-1 h-8 px-3"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/about">
              <Button variant="ghost" size="sm">About</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="sm">Contact</Button>
            </Link>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {getCartItemsCount() > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search mangoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-1 top-1 h-8 px-3"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <div className="space-y-2">
              <Link to="/about" className="block">
                <Button variant="ghost" className="w-full justify-start">About</Button>
              </Link>
              <Link to="/contact" className="block">
                <Button variant="ghost" className="w-full justify-start">Contact</Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start relative"
                onClick={onCartClick}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {getCartItemsCount() > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {getCartItemsCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};