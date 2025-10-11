import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Note } from "@/lib/types";
import axios from "axios";
import { mutate } from "swr";
import { useParams } from "react-router";

export default function SortableLayoutWrapper({
  children,
  notes,
  setNotes,
}: {
  children: React.ReactNode;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const { id } = useParams();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const items = notes.map((note) => note._id);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over?.id) {
      const oldIndex = notes.findIndex((note) => note._id === active.id);
      const newIndex = notes.findIndex((note) => note._id === over.id);

      const newNoteOrder = arrayMove(items, oldIndex, newIndex).map((id) => {
        return notes.find((note) => note._id === id)!;
      });

      setNotes(newNoteOrder);

      reorderNotes(newNoteOrder, id);
    }
  }

  async function reorderNotes(newOrder: Note[], notebookId?: string) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/${
        import.meta.env.VITE_API_VERSION
      }/notes/reorder`,
      { newNoteOrder: newOrder },
      {
        withCredentials: true,
      }
    );
    if (notebookId) {
      mutate(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notebooks/${notebookId}/notes`
      );
    } else {
      mutate(
        `${import.meta.env.VITE_API_URL}/${
          import.meta.env.VITE_API_VERSION
        }/notes`
      );
    }
  }
}
