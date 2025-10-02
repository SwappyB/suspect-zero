export interface Room {
  id: string;
  player1: string;
  player2: string | null;
  gameState: any;
  createdAt: number;
}

declare global {
  var gameRooms: Map<string, Room>;
}
