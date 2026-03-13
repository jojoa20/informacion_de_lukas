import LukasHomeMascotAvatarIntegration from "../../imports/LukasHomeMascotAvatarIntegration";
import { BottomNavigation } from "../components/BottomNavigation";

export function HomePage() {
  return (
    <div className="bg-circuit min-h-screen relative overflow-x-hidden">
      <LukasHomeMascotAvatarIntegration />
      <BottomNavigation />
    </div>
  );
}