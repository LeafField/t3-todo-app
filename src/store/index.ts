import { create } from "zustand";
import { updateTaskInput } from "../schema/todo";

type State = {
  editedTask: updateTaskInput;
  updateEditedTask: (payload: updateTaskInput) => void;
  resetEditedTask: () => void;
};

const useStore = create<State>((set) => ({
  editedTask: { title: "", body: "", taskId: "" },
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),
  resetEditedTask: () =>
    set({
      editedTask: { title: "", body: "", taskId: "" },
    }),
}));

export default useStore;
