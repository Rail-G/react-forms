import React, {useState } from "react";
import { ImageDropper } from "./ImageDropper";
import { v4 } from "uuid";

export function Images() {
    const [images, setImages] = useState<ImageData[]>([]);

    const handleSelect = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(evt.target.files ?? []);
        const result = await Promise.all(files.map(fileToDataUrl));
        setImages(prevImages => ([...prevImages, ...result]));
    }

    const onDelete = (id: string) => {
        setImages(images.filter((image: ImageData) => image.id !== id));
    }

    const fileToDataUrl = (file: File): Promise<ImageData> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (evt) => {
                resolve({ id: v4(), imageUrl: evt.target!.result});
            };
            fileReader.onerror = (evt) => {
                reject(new Error(evt.target?.error?.toString()));
            };
            fileReader.readAsDataURL(file);
        });
    }

    return (
        <div className="image-block">
            <div className="input-image">
                <label>
                    <p>Добавить файл</p>
                    <input type="file" multiple onChange={handleSelect} />
                </label>
            </div>
            <div className="image-view">
                {images.map(image => (
                    <ImageDropper key={image.id} imageData={image} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
}