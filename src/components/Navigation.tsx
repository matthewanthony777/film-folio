import { FileText, Users, Info, Menu, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/articles", label: "Articles", icon: FileText },
    { to: "/collaborate", label: "Collaborate", icon: Users },
    { to: "/about", label: "About Us", icon: Info },
  ];

  const MenuItem = ({ to, label, icon: Icon }) => (
    <Link to={to} onClick={() => setIsOpen(false)}>
      <NavigationMenuLink 
        className={`${navigationMenuTriggerStyle()} 
          backdrop-blur-xl 
          bg-background/5 
          border 
          border-white/10 
          shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]
          transition-all 
          duration-300 
          hover:scale-105 
          hover:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)]
          active:scale-95`}
      >
        {Icon && <Icon className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />}
        {label}
      </NavigationMenuLink>
    </Link>
  );

  return (
    <nav className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList 
            className="backdrop-blur-xl 
              bg-background/5 
              border 
              border-white/10 
              rounded-lg 
              shadow-lg 
              transition-all 
              duration-300 
              hover:shadow-xl"
          >
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.to}>
                <MenuItem {...item} />
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <Menu className="h-5 w-5 transition-opacity duration-200 ease-in-out" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-full h-full bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-md border-none"
          >
            <nav className="flex flex-col gap-8 mt-12">
              <div className="px-6 mb-8">
                <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold tracking-tight text-white/90 transition-colors duration-300 hover:text-white"
                >
                  Film Folio
                </Link>
              </div>
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-6 py-3 text-lg text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white group hover:translate-x-2"
                >
                  {item.icon && (
                    <item.icon className="mr-4 h-5 w-5 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
                  )}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Mobile Title */}
        <div className="md:hidden">
          <Link 
            to="/" 
            className="text-lg font-semibold transition-colors duration-300 hover:text-primary"
          >
            Film Folio
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;