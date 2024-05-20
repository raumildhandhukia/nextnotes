import { Switch } from "@/components/ui/switch";

export const NightModeSwitch = () => {
  //   const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      className="flex justify-between w-full"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <p className="text-sm font-semibold">Dark Mode</p>
      <Switch />
    </div>
  );
};
