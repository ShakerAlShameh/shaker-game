import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { Game } from "../entities/Game";
const apiClient = new ApiClient<Game>("/games");

const useGame = (slug: string) =>
  useQuery({
    queryKey: ["game", slug],
    staleTime: 24 * 60 * 60 * 1000,
    queryFn: () => apiClient.get(slug),
  });

export default useGame;
