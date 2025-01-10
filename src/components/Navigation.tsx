import { FileText, Users, Info, Menu, X } from "lucide-react";
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
    { to: "/", label: "Home", icon: null },
    { to: "/articles", label: "Articles", icon: FileText },
    { to: "/collaborate", label: "Collaborate", icon: Users },
    { to: "/about", label: "About Us", icon: Info },
  ];

  const MenuItem = ({ to, label, icon: Icon }) => (
    <Link to={to} onClick={() => setIsOpen(false)}>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {label}
      </NavigationMenuLink>
    </Link>
  );

  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
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
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-2 py-1 text-lg hover:bg-accent rounded-md"
                >
                  {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Mobile Title */}
        <div className="md:hidden">
          <Link to="/" className="text-lg font-semibold">
            Film Folio
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;