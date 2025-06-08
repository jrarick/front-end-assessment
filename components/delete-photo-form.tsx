"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function DeletePhotoForm({ image }: { image: string }) {
  const handleDelete = async () => {
    const response = await fetch(`/api/delete-photo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });

    if (response.ok) {
      // Optionally, you can refresh the page or update the UI to reflect the deletion
      window.location.reload();
    } else {
      console.error("Failed to delete image");
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <Button
        variant="destructive"
        size="icon"
        type="submit"
        className="rounded-full absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <TrashIcon className="size-4" />
        <span className="sr-only">Delete image</span>
      </Button>
    </form>
  );
}
