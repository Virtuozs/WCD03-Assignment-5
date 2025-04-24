import { LayoutList, LayoutGrid } from "lucide-react";

interface ViewToggleModeProps {
  mobileViewMode: "single" | "grid";
  setMobileViewMode: React.Dispatch<React.SetStateAction<"single" | "grid">>;
}

const ViewToggleMode: React.FC<ViewToggleModeProps> = ({
  mobileViewMode,
  setMobileViewMode,
}) => {
  const baseButton = "w-10 h-10 flex items-center justify-center transition";
  const baseIcon = "transition-colors";

  return (
    <>
      <button
        onClick={() => setMobileViewMode("single")}
        className={`${baseButton} ${
          mobileViewMode === "single" ? "bg-[#58618A]" : "hover:bg-[#05091B]"
        }`}
      >
        <LayoutList
          size={20}
          className={`${baseIcon} ${
            mobileViewMode === "single"
              ? "text-white"
              : "text-[#252A3E] dark:text-white"
          }`}
        />
      </button>
      <button
        onClick={() => setMobileViewMode("grid")}
        className={`${baseButton} ${
          mobileViewMode === "grid" ? "bg-[#58618A]" : "hover:bg-[#05091B]"
        }`}
      >
        <LayoutGrid
          size={20}
          className={`${baseIcon} ${
            mobileViewMode === "grid"
              ? "text-white"
              : "text-[#252A3E] dark:text-white"
          }`}
        />
      </button>
    </>
  );
};

export default ViewToggleMode;
