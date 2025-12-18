import { FiSearch } from "react-icons/fi";
import useNotesStore from "../store";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const { notes, search, selectNote, setSearch } = useNotesStore();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`
        fixed md:static top-0 left-0 h-full bg-white p-4 shadow-lg
        w-4/5 sm:w-2/3 md:w-1/3
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <FiSearch className="text-xl mr-2" />
        <input
          type="text"
          className="w-full border-b focus:outline-none"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Notes List */}
      <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <div
              key={index}
              className="flex items-center p-4 mb-2 rounded-lg shadow-md cursor-pointer border hover:bg-gray-200"
              onClick={() => {
                selectNote(index);
                closeSidebar(); // ✅ auto close on mobile
              }}
            >
              {/* Color Circle */}
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{
                  backgroundColor: note.color,
                  border: "1px solid #000",
                }}
              />

              {/* Note Content */}
              <div
                className="truncate"
                dangerouslySetInnerHTML={{ __html: note.text }}
              />
            </div>
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
