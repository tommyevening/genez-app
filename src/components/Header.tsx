import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Search, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className={cn(
              "flex items-center space-x-2 font-bold text-2xl",
              "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent",
              "hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 transition-all duration-300"
            )}
          >
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-2 text-white">
              <Users className="h-6 w-6" />
            </div>
            <span>GenezApp</span>
          </Link>
        </motion.div>

        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hidden md:flex items-center space-x-2"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Szukaj aktywności..."
                className={cn(
                  "h-10 w-64 rounded-md border border-input bg-background pl-10 pr-3 text-sm",
                  "placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                )}
              />
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium",
              "h-10 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90",
              "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            )}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Dodaj aktywność</span>
            <span className="sm:hidden">Dodaj</span>
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;