import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from '../../components/Loading';
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CreateNotes = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const noteCreate = useSelector((state) => state.noteCreate);
    const { loading, error, note } = noteCreate;

    console.log(note);

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createNoteAction(title, content, category));
        if (!title || !content || !category) return;

        resetHandler();
        navigate("/mynotes");
    };

    useEffect(() => {}, []);

    return (
        <div className="md:px-[100px] min-h-screen bg-darkBG p-8">
            <Card className="mt-3 bg-darkBG">
                <CardHeader>
                    <h2 className="text-lg font-bold text-white">Create a new Note</h2>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submitHandler} className="space-y-4 text-white">
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                placeholder="Enter the title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={content}
                                placeholder="Enter the content"
                                rows={4}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        {content && (
                            <Card className="mt-3">
                                <CardHeader>
                                    <h3 className="text-md font-semibold">Note Preview</h3>
                                </CardHeader>
                                <CardContent>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </CardContent>
                            </Card>
                        )}

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                type="text"
                                value={category}
                                placeholder="Enter the Category"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        {loading && <Loading size={50} />}
                        
                        <div className="flex space-x-2">
                            <Button type="submit" variant="primary" className="bg-buttonColor">
                                Create Note
                            </Button>
                            <Button type="button" variant="destructive" onClick={resetHandler}>
                                Reset Fields
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Creating on - {new Date().toLocaleDateString()}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CreateNotes;