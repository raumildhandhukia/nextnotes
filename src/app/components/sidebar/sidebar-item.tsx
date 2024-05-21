interface SideBarIconProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  isExpanded: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  otherItemState: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export const SideBarItem = ({
  icon,
  text,
  active,
  isExpanded,
  onClick,
  otherItemState,
  children,
}: SideBarIconProps) => {
  return (
    <div className="">
      <li
        onClick={() => {
          onClick((prev) => {
            otherItemState(false);
            return !prev;
          });
        }}
        className={`group h-[5vh] relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 dark:from-indigo-800 dark:to-indigo-700 dark:text-indigo-100"
            : "hover:bg-indigo-50 text-grey-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            isExpanded ? "w-full ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {!isExpanded && (
          <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm w-max invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            {text}
          </div>
        )}
      </li>
      {active && children}
    </div>
  );
};
