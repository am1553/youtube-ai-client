export type Chat = { from: "me" | "bot"; message: string };
type ActionType = "add";

export default function chatReducer(
  state: Chat[],
  action: { type: ActionType; payload: Chat }
) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
}
