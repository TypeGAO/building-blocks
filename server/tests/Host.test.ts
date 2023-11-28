// hostSocketConnection.test.ts
import { Server, Socket } from "socket.io";
import hostSocketConnection from "../src/routes/sockets/host";
import {
  generateUniqueCode,
  newGameActivity,
  getGameActivity,
  setGameActivity,
  insertGameActivity,
  endGame,
} from "../services/generateGameService";

jest.mock("../../../services/generateGameService");

describe("hostSocketConnection", () => {
  let io: Server;
  let socket: Socket;

  beforeEach(() => {
    io = new Server();
    socket = new Socket();
    io.sockets = new Server();
    io.sockets.adapter = {
      rooms: new Map(),
      sids: new Map(),
      namespace: () => ({
        adapter: {
          rooms: new Map(),
          sids: new Map(),
        },
      }),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle createRoom event", async () => {
    const roomId = "testRoom";
    const questionSetId = 123;

    generateUniqueCode.mockReturnValueOnce(roomId);
    insertGameActivity.mockResolvedValueOnce(undefined);

    await hostSocketConnection(io);

    const emitSpy = jest.spyOn(socket, "emit");
    await io.sockets.emit("connection", socket);
    await io.sockets.emit("createRoom", questionSetId);

    expect(generateUniqueCode).toHaveBeenCalled();
    expect(socket.join).toHaveBeenCalledWith(roomId);
    expect(insertGameActivity).toHaveBeenCalledWith(expect.any(Object), roomId);
    expect(emitSpy).toHaveBeenCalledWith("roomCreated", expect.any(Object));
  });

  // Add more test cases for other events (startGame, setQuestionSet, setTime, etc.)
});
