import  { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction, getSpecificNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

function SingleNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const specificNote = useSelector((state) => state.getSpecificNote);
  const { loading: loadingNote, error: errorNote, notes } = specificNote;

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
      navigate("/mynotes");
    }
  };

  useEffect(() => {
    if (!notes || notes._id !== id) {
      dispatch(getSpecificNoteAction(id));
    } else {
      setTitle(notes.title);
      setContent(notes.content);
      setCategory(notes.category);
      setDate(notes.updatedAt);
    }
  }, [dispatch, id, notes]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;

    dispatch(updateNoteAction(id, title, content, category));
    resetHandler();
    navigate("/mynotes");
  };

  return (
    <div className="w-full min-h-screen bg-[#0a091b] relative z-0 pt-5">
      <div
        className="
          absolute
          left-0 bottom-10
          w-[10%] h-72
          bg-radial-gradient
          from-gradientStart
          to-gradientEnd
          filter blur-2xl
          pointer-events-none
          -z-30 
        "
      ></div>
      <div
        className="
          absolute
          top-[30%]
          w-[70%] h-72
          bg-radial-gradient
          from-gradientStart
          to-gradientEnd
          filter blur-2xl
          pointer-events-none
          -z-30 
        "
      ></div>
      <div className="relative m-auto w-full max-w-4xl mt-5 flex flex-col shadow-md rounded-lg p-6 text-gray-300 bg-gray-800">
        <form
          className="flex flex-col space-y-4"
          onSubmit={updateHandler}
        >
          {loadingNote && <Loading />}
          {errorNote && <ErrorMessage variant="danger">{errorNote}</ErrorMessage>}
          {loadingDelete && <Loading />}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
          )}
          <div>
            <label className="block text-gray-300">Title</label>
            <Input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-300">Content</label>
            <textarea
              placeholder="Enter the content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 bg-gray-700 text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {content && (
            <div className="bg-gray-700 p-4 rounded-md">
              <h3 className="text-gray-300 font-bold mb-2">Note Preview</h3>
              <ReactMarkdown className="text-gray-200">{content}</ReactMarkdown>
            </div>
          )}

          <div>
            <label className="block text-gray-300">Category</label>
            <Input
              type="text"
              placeholder="Enter the Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full"
            />
          </div>
          {loading && <Loading size={50} />}
          <div className="flex space-x-4">
            <Button onClick={updateHandler} className="bg-blue-500 hover:bg-blue-600">
              Update Note
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={deleteHandler}
            >
              Delete Note
            </Button>
          </div>
        </form>
        <div className="mt-4 text-gray-400">
          Updated on - {date ? date.substring(0, 10) : "N/A"}
        </div>
      </div>
    </div>
  );
}

export default SingleNote;
