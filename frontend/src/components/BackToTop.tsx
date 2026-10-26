import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          type="button"
          className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#9A6735] hover:bg-[#855527] text-white rounded-[4px] w-10 h-10 items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer animate-fade-in"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white stroke-[2.5]" />
        </button>
      )}
    </>
  );
};

export default BackToTop;