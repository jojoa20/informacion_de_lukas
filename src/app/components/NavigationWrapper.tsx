import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { ReactNode, useEffect } from "react";

interface NavigationWrapperProps {
  children: ReactNode;
  currentPage: "home" | "brain" | "heart" | "magic";
}

export function NavigationWrapper({ children, currentPage }: NavigationWrapperProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Add click listeners to navigation elements
    const handleNavigation = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('[data-name*="Link"]');
      
      if (link) {
        const linkText = link.textContent?.toLowerCase().trim();
        
        if (linkText?.includes("inicio") || linkText?.includes("home")) {
          e.preventDefault();
          navigate("/");
        } else if (linkText?.includes("brain") || linkText?.includes("comparador")) {
          e.preventDefault();
          navigate("/brain");
        } else if (linkText?.includes("cartera") || linkText?.includes("wallet")) {
          e.preventDefault();
          navigate("/heart");
        } else if (linkText?.includes("social") || linkText?.includes("magic")) {
          e.preventDefault();
          navigate("/magic");
        }
      }

      // Handle specific button clicks
      const button = target.closest('button, [role="button"]');
      if (button) {
        const buttonText = button.textContent?.toLowerCase();
        
        if (buttonText?.includes("registrar gasto")) {
          e.preventDefault();
          // Show a toast or modal for expense registration
          console.log("Registrar Gasto clicked");
        } else if (buttonText?.includes("explorar magia")) {
          e.preventDefault();
          // Navigate to a specific occasion
          console.log("Explorar Magia clicked");
        }
      }
    };

    document.addEventListener("click", handleNavigation);
    return () => document.removeEventListener("click", handleNavigation);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
