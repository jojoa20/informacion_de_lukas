import TheHeartSharedBudgets from "../../imports/TheHeartSharedBudgets";
import { BottomNavigation } from "../components/BottomNavigation";

export function TheHeartPage() {
  return (
    <div className="bg-circuit min-h-screen relative overflow-x-hidden">
      <TheHeartSharedBudgets />
      <BottomNavigation />
    </div>
  );
}