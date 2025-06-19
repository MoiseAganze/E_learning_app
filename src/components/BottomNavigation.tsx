import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, MessageCircle } from "lucide-react";
import { DynamicNavigation } from "@/components/DynamicNavigation";
import { cn } from "@/lib/utils";

interface BottomNavItem {
  id: string;
  icon: any;
  label: string;
  href: string;
}

const navItems: BottomNavItem[] = [
  {
    id: "accueil",
    icon: GraduationCap,
    label: "Accueil",
    href: "#",
  },
  {
    id: "contact",
    icon: MessageCircle,
    label: "Contact",
    href: "#contact",
  },
];

export function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("accueil");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["accueil", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections.reverse()) {
        const element =
          section === "accueil"
            ? document.body
            : document.getElementById(section);

        if (element) {
          const elementTop = section === "accueil" ? 0 : element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveItem(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (item: BottomNavItem) => {
    setActiveItem(item.id);

    if (item.href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2 z-50 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={cn(
              "flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 relative",
              activeItem === item.id
                ? "text-primary bg-primary/10"
                : "text-gray-600 hover:text-primary hover:bg-gray-50",
            )}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {activeItem === item.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg"
                layoutId="activeBackground"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}

            <motion.div
              className="relative z-10"
              animate={{
                scale: activeItem === item.id ? 1.1 : 1,
                rotate: activeItem === item.id ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <item.icon className="w-5 h-5" />
            </motion.div>

            <motion.span
              className={cn(
                "text-xs mt-1 relative z-10 font-medium",
                activeItem === item.id && "text-primary",
              )}
              animate={{
                fontWeight: activeItem === item.id ? 600 : 400,
              }}
            >
              {item.label}
            </motion.span>

            {activeItem === item.id && (
              <motion.div
                className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
            )}
          </motion.button>
        ))}

        <div className="flex flex-col items-center py-2 px-3">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <DynamicNavigation />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
