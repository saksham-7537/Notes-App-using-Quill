import { AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useNotesStore from "./store";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const App = () => {
  const {
    editorContent,
    noteColor,
    currentNoteIndex,
    setEditorContent,
    setNoteColor,
    addOrUpdateNote,
  } = useNotesStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden mb-4 text-2xl"
          onClick={() => setSidebarOpen(true)}
        >
          <AiOutlineMenu />
        </button>

        {/* Editor */}
        <div className="p-2 sm:p-4 rounded-lg">
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            placeholder="Write your note here..."
            theme="snow"
            className="h-64 sm:h-80 md:h-96 bg-white mb-6"
          />
        </div>

        {/* Color Selector */}
        <div className="flex items-center space-x-4 mt-4">
          <input
            type="color"
            value={noteColor}
            onChange={(e) => setNoteColor(e.target.value)}
            className="w-10 h-10 p-1 border rounded-full"
          />
          <p className="text-sm sm:text-base">Choose a note color</p>
        </div>

        {/* Save Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg shadow-lg hover:bg-blue-600 flex items-center"
          onClick={addOrUpdateNote}
        >
          <AiOutlinePlus className="mr-2" />
          {currentNoteIndex !== null ? "Update Note" : "Save Note"}
        </button>
      </div>
    </div>
  );
};

export default App;
