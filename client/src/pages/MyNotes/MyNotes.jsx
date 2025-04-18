import  { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Badge,  Container, Card } from 'react-bootstrap';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { listNotes, deleteNoteAction } from '../../actions/notesActions';
import ReactMarkdown from 'react-markdown'; // Import react-markdownimp
import { PlusIcon, PenBox, DeleteIcon } from 'lucide-react';

const MyNotes = ({search}) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);

  const { loading, notes, error } = noteList;
  console.log(notes);

  const [openAccordions, setOpenAccordions] = useState([]);

  const handleToggle = (index) => {
    setOpenAccordions((prevOpenAccordions) => {
      if (prevOpenAccordions.includes(index)) {
        // If it's already open, close it
        return prevOpenAccordions.filter((i) => i !== index);
      } else {
        // Otherwise, open it
        return [...prevOpenAccordions, index];
      }
    });
  };

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      dispatch(listNotes());
    } else {
      navigate('/');
    }
  }, [dispatch, userInfo, navigate]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen bg-[#0a091b] z-0 text-white">
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
      <MainScreen title={`Welcome Back ${userInfo.name}...`} />
      <Container className="z-10">
        <Link to="/createnote" className="nounderline">
          <Button className="bg-buttonColor text-white py-2 px-6 rounded-lg  mb-[30px] border-[1px] border-gray-400">
            Create New Note 
            <PlusIcon/>
          </Button>
        </Link>

        {notes?.reverse().filter(filteredNote => 
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        ).map((note, index) => (
          <div key={note._id} className="mt-[20px]">
            <Card bg="dark" text="white" className="shadow-lg">
              <Card.Header className="flex justify-between items-center bg-[#1c1c1c]">
                <div
                  className={`cursor-pointer text-[20px] font-semibold ${
                    openAccordions.includes(index) ? 'text-blue-500' : ''
                  }`}
                  onClick={() => handleToggle(index)}
                >
                  {note.title}
                </div>

                <div className="flex gap-[10px]">
                  <Link to={`/note/${note._id}`}>
                    <Button className="bg-accent text-white bg-buttonColor  py-1 px-4 rounded-lg ">
                      Edit <PenBox />
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 border-[1px] border-buttonColor"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete <DeleteIcon />
                  </Button>
                </div>
              </Card.Header>

              {openAccordions.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card.Body className="bg-[#1c1c1c]">
                    <h4>
                      <Badge bg="success" className="text-white">
                        Category - {note.category}
                      </Badge>
                    </h4>

                    <blockquote className="blockquote mb-0">
                      {/* Render the content using ReactMarkdown */}
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                    </blockquote>
                  </Card.Body>
                </motion.div>
              )}
            </Card>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default MyNotes;
