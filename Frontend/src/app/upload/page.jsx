"use client";
import axios from "axios";
import React, { useState } from "react";
import UploadImg from "@/assets/Images/Upload.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://serverfinal.mangosmoke-f0a47ece.centralindia.azurecontainerapps.io/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };

  return (
    <div className="max-w-screen-md max-h-screen mx-auto p-5">
      <div className="text-center mb-16">
        <h3 className="text-3xl leading-normal font-bold tracking-tight text-blue-600">
          Create New Decision Tree
        </h3>
        <Image
          src={UploadImg}
          alt="Upload Hero Section"
          width={450}
          height={450}
        />
      </div>

      <form className="w-full -mt-24">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
              Upload Excel format Decision Tree
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              required
            />
            <Button
              variant="outline"
              className="bg-blue-500 rounded-xl text-white font-semibold hover:border-blue-700 mb-2"
              onClick={() => uploadFile()}
            >
              Upload Excel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
