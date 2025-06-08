import fs from "fs";
import path from "path";
import ImagesGrid from "./images-grid";
import { Suspense } from "react";

export default function ImageGallery() {
  // Get images from public/uploads directory
  const imagesDir = path.join(process.cwd(), "public", "uploads");

  const images = fs.existsSync(imagesDir)
    ? fs
        .readdirSync(imagesDir)
        .filter((file) => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file))
    : [];

  return (
    <div className="pb-12">
      {images.length > 0 && (
        <p className="font-medium text-lg mb-4">{images.length} total images</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.length > 0 ? (
          // Extract into a separate client component since it needs search params which are a client feature
          <Suspense>
            <ImagesGrid images={images} />
          </Suspense>
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No images found. Please upload some images.
          </p>
        )}
      </div>
    </div>
  );
}
