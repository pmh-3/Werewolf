import { atom } from "recoil";

// Recoil States

// Current Player name
export const playerNameState = atom({
  key: "playerNameState",
  default: "",
});

// Room Code
export const roomIdState = atom({
  key: "roomIdState",
  default: undefined,
});

// TBD: to remove or not
export const roomJoinStatus = atom({
  key: "roomJoinStatus",
  default: false,
});

// List of players in the room
export const playersState = atom({
  key: "playersState",
  default: [],
});

// Current Player role
export const playerRoleState = atom({
  key: "playerRoleState",
  default: "",
});

// Current Player final target
export const playerFinalTargetState = atom({
  key: "playerTargetState",
  default: "",
});
