export type GameActivity = {
  role?: "player" | "host"
  stage: "landing" | "lobby" | "game"
  playerCount: number | 0
}
