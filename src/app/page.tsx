import { MenuBar } from "@/components/menu-bar";
import { Dock } from "@/components/dock";
import { Desktop } from "@/components/desktop";

export default function Home() {
  return (
    <Desktop>
      <MenuBar />
      <Dock />
    </Desktop>
  );
}
