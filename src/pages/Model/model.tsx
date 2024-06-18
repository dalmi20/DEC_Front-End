
import React, { useEffect, useState} from "react";
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import axios, { AxiosResponse } from 'axios';
import { Progress } from "@/components/ui/progress"

import socketIOClient from 'socket.io-client';


export default function Model() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [domain, setDomain] = useState<string>('');
    const [method, setMethod] = useState<string>('');
    const [transformedImage, setTransformedImage] = useState<string>('')
    const [dialog, setDialog] = useState<boolean>(false)
    const [error, setError] = useState<string>('');
    const { toast } = useToast()
    const [message, setMessage] = useState<string>('');
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        const socket = socketIOClient('http://localhost:5000');

        socket.on('connect', () => {
            console.log('Connected to the Socket.IO server');
        });

        socket.on('training', (data: any) => {
            setMessage(data.data);
            setProgress(data.progress)
        });

    }, []);

    const onSubmit = async () => {
        if (!domain || !method || !selectedFile) {
            toast({
                duration: 5000,
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please ensure that all fields are filled out"
            });
        } else {
            const formData = new FormData();
            formData.append('domain', domain);
            formData.append('method', method);
            //@ts-ignore
            formData.append('file', selectedFile);

            try {
                setDialog(true);
                const response: AxiosResponse<any> = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.error) {
                    setError(response.data.error);
                    toast({
                        duration: 5000,
                        variant: "destructive",
                        title: "Error",
                        description: response.data.error
                    });
                } else {
                    setTransformedImage(`data:image/png;base64,${response.data.image}`);
                    setDialog(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred during the request. Please try again.');
                toast({
                    duration: 5000,
                    variant: "destructive",
                    title: "Error",
                    description: "An error occurred during the request. Please try again."
                });
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            setSelectedFile(event.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <Navbar />
            <div className=" flex flex-col justify-center  w-6/12  my-5">

                {!transformedImage ? (
                    <>
                        <div className="flex justify-start font-bold p-4 ">
                            Deep Clustering For Image Segmentation
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className=" flex flex-row  justify-around  w-full py-5">
                                <div className="flex flex-col gap-2 w-3/5 mx-3">
                                    <Select defaultValue="" onValueChange={(e) => { setDomain(e) }}>
                                        <SelectTrigger className="w-full ">
                                            <SelectValue placeholder="Select a domain" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectGroup  >
                                                <SelectLabel>Domains</SelectLabel>
                                                <SelectItem value="satellite images">Satellite Images</SelectItem>
                                                <SelectItem value="brain tumor detection">Brain Tumor Detection</SelectItem>

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2 w-3/5 mx-3">
                                    <Select defaultValue="" onValueChange={(e) => { setMethod(e) }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Methods</SelectLabel>
                                                <SelectItem value="1">Baseline Method</SelectItem>
                                                <SelectItem value="2">Lab Preprocess Method</SelectItem>
                                                <SelectItem value="3">Log Transformation Method</SelectItem>
                                                <SelectItem value="4">HSV Preprocess Method</SelectItem>
                                                <SelectItem value="5">Lab and Log Preprocess Method</SelectItem>
                                                {domain == "brain tumor detection" &&  <SelectItem value="6">No Local Means Preprocess Method</SelectItem>}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {!selectedFile ? (
                                <>
                                    <div className="flex items-center justify-center w-full px-3 pb-2" onDragOver={handleDragOver} onDrop={handleDrop}>
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#450EA7] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-950 hover:bg-gray-100 dark:border-[#450EA7] dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 1080x1920px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" accept=".png, .jpg, .jpeg" className="hidden" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                </>

                            ) : (
                                <>
                                    <div className="flex items-center justify-center w-full px-3 pb-2 relative">
                                        <div className="relative">
                                            <img
                                                src={URL.createObjectURL(selectedFile)}
                                                alt="Uploaded"
                                                className="max-w-full max-h-full"
                                            />
                                            <FaTrash className="absolute top-2 right-2 cursor-pointer" size={18} color="#D10000" onClick={() => { setSelectedFile(null) }} />
                                        </div>
                                    </div>


                                </>
                            )}
                            <Button variant={"dark"} className="w-1/4 my-2 text-sm" onClick={onSubmit}>Segment</Button>
                            {dialog && (
                                <Dialog open={dialog}>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Image Segmentation Process </DialogTitle>
                                        </DialogHeader>
                                        <Progress value={progress} />
                                        <DialogFooter>
                                            <span className="text-sm">{message}</span>
                                        </DialogFooter>
                                    </DialogContent>

                                </Dialog>
                            )}

                        </div>
                    </>) : (
                    <>
                        <div className="flex justify-center font-bold p-4 ">
                            Deep Clustering For Image Segmentation
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className="flex items-center justify-center w-full px-3 pb-2 relative">
                                <div className="relative">
                                    <img
                                        src={transformedImage}
                                        alt="Uploaded"
                                        className="max-w-full max-h-full"
                                    />
                                </div>

                            </div>
                            <Button variant={"dark"} className="w-1/4 my-2 text-sm" >  <a
                                className="styled-like-a-button"
                                download={"segmented Image.png"}
                                href={transformedImage}>Download</a></Button>

                        </div>
                    </>

                )
                }

            </div>
        </div>
    )
}