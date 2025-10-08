import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-3">
      <Input
        type="text"
        placeholder="Buscar por nome da ferramenta:"
        className="bg-white"
      />
      <Button variant="outline">
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
