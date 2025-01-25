import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { useAppStore } from "./app-store-provider";

const Search: React.FC = () => {
  const currentRoute = useAppStore((state) => state.currentRoute);
  if (currentRoute === "PROFILE") {
    return (
      <div className="relative w-[214px] h-[33px]">
        <input
          type="text"
          className="text-[12px] w-full h-full pl-[40px] pr-[10px] py-[5px] rounded-[15.5px] border border-[#D0D0D0] focus:outline-none"
          placeholder="Search..."
        />
        <SearchIcon className="w-[20px] h-[20px] absolute left-[10px] top-[50%] transform -translate-y-[50%] text-[#9C9C9C]" />
      </div>
    );
  }
  return null;
};

export default Search;
