import { useAtom } from "jotai";
import { selectionAtom } from "../atoms";

const useProjectSelection = () => {
  const [selection,setSelection] = useAtom(selectionAtom);

  const updateSelection = (value) => {
    setSelection(value);
  }

  const toggleRow = (id: string) => {
    selection.includes(id)
    setSelection((current) =>
    current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id],
  );
  }

  const toggleAll = (data) =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id),
    );

  return {
    toggleRow,
    toggleAll,
    selection,
    updateSelection
  };
};

export default useProjectSelection;
