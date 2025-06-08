"use client";

import {
  AlertCircleIcon,
  LoaderCircleIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";

import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "./ui/dialog";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

export default function FileUpload({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const maxSize = 10 * 1024 * 1024; // 10MB

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
    accept: "image/*",
  });

  const file = files[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file.file as Blob);

      const response = await fetch("/api/upload-photo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload successful:", result.url);
        setDialogOpen(false);

        // Refresh page to show the new image
        router.refresh();
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
            disabled={Boolean(file)}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <UploadIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Upload file</p>
            <p className="text-muted-foreground text-xs">
              Drag & drop or click to browse (max. {formatBytes(maxSize)})
            </p>
          </div>
        </div>

        {errors.length > 0 && (
          <div
            className="text-destructive flex items-center gap-1 text-xs"
            role="alert"
          >
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}

        {/* File list */}
        {file && (
          <div className="space-y-2">
            <div
              key={file.id}
              className="flex items-center justify-between gap-2 rounded-xl border px-3 py-2"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {file.preview && (
                  <Image
                    width={40}
                    height={40}
                    src={file.preview}
                    alt={file.file.name}
                    className="rounded-md border shadow-2xl object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium">
                    {file.file.name}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                onClick={() => removeFile(files[0]?.id)}
                aria-label="Remove file"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <DialogFooter className="mt-2">
        <Button disabled={!file} type="submit">
          {isUploading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <UploadIcon />
          )}
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </DialogFooter>
    </form>
  );
}
