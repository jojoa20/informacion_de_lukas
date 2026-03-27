import TheBrainMascotScannerIntegration from "../../imports/TheBrainMascotScannerIntegration";
import { BottomNavigation } from "../components/BottomNavigation";

export function TheBrainPage() {
  return (
    <div className="bg-poly-grid min-h-screen relative overflow-x-hidden">
      <TheBrainMascotScannerIntegration />
      <BottomNavigation />
    </div>
  );
}