import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Badge, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const MyNotes = () => {
  const [openAccordions, setOpenAccordions] = useState([]);
  const [notes, setNotes] = useState([]);

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

  // Api calling 
  // Api calling 
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/notes");
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      // Add your delete logic here
    }
  };

  return (
    <div>
      <MainScreen title="Welcome Back Abhinav Shrivastav..." />
      <Container>
        <Link to="createnote" className="nounderline">
          <Button className="mb-[30px]">Create New Note</Button>
        </Link>

        {notes.map((note, index) => (
          <div key={note._id} className="mt-[20px]">
            <Card>
              <Card.Header className="flex justify-between items-center">
                <div
                  className={`cursor-pointer text-[20px] font-semibold ${openAccordions.includes(index) ? 'text-blue-500' : ''
                    }`}
                  onClick={() => handleToggle(index)}
                >
                  {note.title}
                </div>

                <div className="flex gap-[10px]">
                  <Link to={`/note/${note._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
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
                  <Card.Body>
                    <h4>
                      <Badge bg="success" className="text-white">
                        Category - {note.category}
                      </Badge>
                    </h4>

                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
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
