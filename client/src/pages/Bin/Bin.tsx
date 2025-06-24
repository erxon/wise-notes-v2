import PagesLayout from "../PagesLayout";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import DeletedNote from "./DeletedNote";
import { Note } from "@/lib/types";

export default function Bin() {
  return (
    <PagesLayout page="Bin">
      <div>
        <DeletedNotes />
      </div>
    </PagesLayout>
  );
}

function DeletedNotes() {
  const {
    data: notes,
    isLoading,
    error,
  } = useSWR(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/bin/`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (notes) {
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
        {notes && notes.data && notes.data.length > 0 ? (
          notes.data.map((note: Note) => (
            <DeletedNote key={note._id} note={note} />
          ))
        ) : (
          <div>You don't have notes in the bin</div>
        )}
      </div>
    );
  }
}
