import {
  Grid,
  GridItem,
  HStack,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavBar from "./Components/NavBar/NavBar";
import GridGameCard from "./Components/GameCard/GridGameCard";
import GenresList from "./Components/GenresList/GenresList";
import { useState } from "react";
import { Genres } from "./hook/useGenres";
import PlatformMenu from "./Components/MenuList/PlatformMenu";
import { PlatformFilter } from "./hook/usePlatformFilter";
import SortSelector from "./Components/MenuList/SortSelector";
import HeadingTitle from "./Components/Heading";
import HeadingGenres from "./Components/GenresList/HeadingGenres";

export interface GameQuery {
  genre: Genres | null;
  platforms: PlatformFilter | null;
  ordering: string | null;
  searchedText: string | null;
}

export default function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        lg: "230px 1fr",
      }}
      templateAreas={{
        base: `"nav" "body"`,
        md: `"nav nav" "side body"`,
        lg: `"nav nav" "side body"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar
          onSearch={(searchedText) => {
            setGameQuery({ ...gameQuery, searchedText });
          }}
        />
      </GridItem>
      <Show when={useBreakpointValue({ base: false, md: true, lg: true })}>
        <GridItem paddingLeft={1} paddingTop={2} area={"side"}>
          <HeadingGenres />
          <GenresList
            selectedGenre={(genre) => {
              setGameQuery({ ...gameQuery, genre });
            }}
          />
        </GridItem>
      </Show>
      <GridItem paddingTop={3} area={"body"}>
        <HeadingTitle gameQuery={gameQuery} />
        <HStack paddingX={3}>
          <PlatformMenu
            label={gameQuery.platforms?.name}
            selectedPlatform={(platforms) => {
              setGameQuery({ ...gameQuery, platforms });
            }}
          />
          <SortSelector
            label={gameQuery.ordering}
            selectedSort={(ordering) => {
              setGameQuery({ ...gameQuery, ordering });
            }}
          ></SortSelector>
        </HStack>
        <GridGameCard gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}
