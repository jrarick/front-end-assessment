"use client";

import Image from "next/image";
import DeletePhotoForm from "./delete-photo-form";
import { useSearchParams } from "next/navigation";

export default function ImagesGrid({ images }: { images: string[] }) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  return (
    <>
      {images
        .filter((image) => !searchTerm || image.includes(searchTerm))
        .map((image, index) => (
          <div key={index} className="group relative">
            <Image
              width={500}
              height={500}
              src={`/uploads/${image}`}
              alt=""
              className="w-full h-auto rounded-lg shadow-md aspect-square object-cover"
            />
            <p className="text-muted-foreground font-medium text-xs mt-1">
              {splitWithSearchTerm(image, searchTerm).map((part, index) => (
                <span
                  key={index}
                  className={part === searchTerm ? "bg-yellow-200" : ""}
                >
                  {part}
                </span>
              ))}
            </p>
            <DeletePhotoForm image={image} />
          </div>
        ))}
    </>
  );
}

function splitWithSearchTerm(text: string, delimiter: string): string[] {
  // If the delimiter is an empty string, return the original text as a single part
  if (!delimiter) {
    return [text];
  }

  const parts: string[] = [];
  let currentIndex = 0;
  let foundIndex = text.indexOf(delimiter, currentIndex);

  while (foundIndex !== -1) {
    // Add the part before the delimiter (if not empty)
    if (foundIndex > currentIndex) {
      parts.push(text.slice(currentIndex, foundIndex));
    }

    // Add the delimiter itself
    parts.push(delimiter);

    // Move past the delimiter
    currentIndex = foundIndex + delimiter.length;
    foundIndex = text.indexOf(delimiter, currentIndex);
  }

  // Add any remaining text after the last delimiter
  if (currentIndex < text.length) {
    parts.push(text.slice(currentIndex));
  }

  return parts.filter((part) => part !== ""); // Remove empty strings
}
