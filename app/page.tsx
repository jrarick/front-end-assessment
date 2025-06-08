import ImageGallery from "@/components/image-gallery";
import SearchBar from "@/components/search-bar";
import UploadDialog from "@/components/upload-dialog";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-8">
      <div className="flex justify-between py-16 space-x-4">
        <SearchBar />
        <UploadDialog />
      </div>
      <ImageGallery />
    </div>
  );
}
