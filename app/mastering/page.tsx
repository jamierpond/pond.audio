"use client";

import React, { useRef, useState } from 'react';


function simulateFileUpload(file: File, onProgress: (progress: number) => void) {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        resolve(progress);
      }
    }, 100);
  });
}

function UploadFile() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: any) => {
    const fileList: File[] = Array.from(e.target.files);
    const newFiles = fileList.map((file) => ({ name: file.name, progress: 0 }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    fileList.forEach(handleUpload);
  };

  const handleUpload = async (file: any) => {
    const onProgress = (progress: number) => {
      setFiles((prevFiles) => {
        const fileIndex = prevFiles.findIndex((f) => f.name === file.name);
        const newFiles = [...prevFiles];
        newFiles[fileIndex] = { ...newFiles[fileIndex], progress };
        return newFiles;
      });
    };

    await simulateFileUpload(file, onProgress);

  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  function handleDragOver (e: any) {
    e.preventDefault();
    e.stopPropagation();
  };

  function handleDrop (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const fileList: File[] = Array.from(e.dataTransfer.files);
    const newFiles = fileList.map((file) => ({ name: file.name, progress: 0 }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    fileList.forEach(handleUpload);
  };

  return (
    <div>
      <div
        className={`relative h-[200px] border-2 ${isDragging ? 'bg-gray-100 border-dashed border-gray-400' : 'border-gray-300'} rounded-md flex items-center justify-center cursor-pointer`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          className="absolute w-0 h-0 opacity-0 overflow-hidden"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="text-center">
          <p className="mb-2">Drop your files here or</p>
          <button className="text-blue-600 font-semibold">Browse Files</button>
        </div>
      </div>
      <div className="mt-4">
        {files.map((file) => (
          <div key={file.name} className="flex items-center mb-2">
            <div className="flex-grow">
              <div className="text-sm">{file.name}</div>
              <div className="bg-gray-200 rounded h-2">
                <div
                  className="bg-blue-500 transition-all duration-300 rounded"
                  style={{ width: `${file.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-2 text-xs">{file.progress}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Mastering() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Mastering</h1>
        <h2> Upload your music </h2>
        <UploadFile />
      </div>
    </>
  );
}
