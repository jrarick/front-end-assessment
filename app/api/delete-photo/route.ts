import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const json = await request.json();
  const filename = json.image;

  if (!filename) {
    return Response.json({ error: "Filename is required" }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    await fs.unlink(filePath);
    return Response.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return Response.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
