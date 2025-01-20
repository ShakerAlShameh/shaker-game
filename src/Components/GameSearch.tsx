import { Input } from "@chakra-ui/react";
import { InputGroup } from "./ui/input-group";
import { BsSearch } from "react-icons/bs";
import { useRef } from "react";
import { useNavigate } from "react-router";
import useGameQueryStore from "@/hook/useGameQueryStore";

export default function GameSearch() {
  const setSearchText = useGameQueryStore((e) => e.setSearchText);
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      id="search"
      name="search"
      style={{ width: "100%", borderRadius: 35 }}
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) {
          setSearchText(ref.current.value);
          navigate("/");
        }
      }}
    >
      <InputGroup style={{ width: "100%" }} startElement={<BsSearch />}>
        <Input ref={ref} placeholder="Game Name..." borderRadius={35}></Input>
      </InputGroup>
    </form>
  );
}
