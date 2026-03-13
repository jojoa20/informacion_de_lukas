import TheMagicOccasionsFeed from "../../imports/TheMagicOccasionsFeed";
import { BottomNavigation } from "../components/BottomNavigation";

export function TheMagicPage() {
  return (
    <div className="bg-poly-grid min-h-screen relative overflow-x-hidden">
      <TheMagicOccasionsFeed />
      <BottomNavigation />
    </div>
  );
}