import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";

export const NightModeSwitch = () => {
  //   const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="flex justify-between w-full"
      onClick={(e) => {
        e.stopPropagation();
        toggleTheme();
      }}
    >
      <p className="text-sm font-semibold">Dark Mode</p>
      <Switch checked={theme === "dark"} />
    </div>
  );
};
