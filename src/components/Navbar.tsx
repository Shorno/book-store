import { useState } from 'react'
import { Link } from 'react-router'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart, User, Menu, X, BookOpen } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-background dark:bg-background border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <BookOpen className="h-8 w-8 mr-2 text-primary"/>
                            <span className="font-bold text-xl text-foreground">BookStore</span>
                        </Link>
                    </div>
                    <div className="hidden md:block flex-grow mx-4">
                        <div className="flex items-center">
                            <Input
                                type="search"
                                placeholder="Search for books..."
                                className="w-full bg-background text-foreground"
                            />
                            <Button type="submit" variant="outline" className="ml-2">
                                <Search className="h-5 w-5"/>
                            </Button>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/account" className="flex items-center text-foreground hover:text-primary">
                            <User className="h-5 w-5 mr-1"/>
                            <span>Account</span>
                        </Link>
                        <Link to="/cart" className="flex items-center text-foreground hover:text-primary">
                            <ShoppingCart className="h-5 w-5 mr-1"/>
                            <span>Cart</span>
                        </Link>
                        <ModeToggle />
                    </div>
                    <div className="md:hidden flex items-center space-x-2">
                        <ModeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6"/>
                            ) : (
                                <Menu className="h-6 w-6"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-background dark:bg-background">
                    <div className="px-4 pt-2 pb-3 space-y-2">
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search for books..."
                                className="w-full pr-10 bg-background text-foreground"
                            />
                            <Button
                                type="submit"
                                variant="ghost"
                                className="absolute right-0 top-0 h-full px-3"
                            >
                                <Search className="h-5 w-5"/>
                            </Button>
                        </div>
                        <Link to="/account"
                              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition duration-150 ease-in-out">
                            <User className="h-5 w-5 mr-3"/>
                            Account
                        </Link>
                        <Link to="/cart"
                              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition duration-150 ease-in-out">
                            <ShoppingCart className="h-5 w-5 mr-3"/>
                            Cart
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

