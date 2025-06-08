"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import FileUpload from "./file-upload";

export default function UploadDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Upload</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sm:text-center font-semibold">
            Upload an image
          </DialogTitle>
          <DialogDescription className="text-muted-foreground sm:text-center text-xs">
            You can upload any valid image file
          </DialogDescription>
        </DialogHeader>
        <FileUpload setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}
