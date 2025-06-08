import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("file") as File;
  const errors: string[] = [];
  if (!file) {
    errors.push("No file provided or invalid file type.");
  }

  if (errors.length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  const imageUrl = await saveImageToFileSystem(file, file.name);
  return Response.json({ url: imageUrl });
}

async function saveImageToFileSystem(file: File, filename: string) {
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  // Ensure directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(uploadDir, filename);

  await fs.writeFile(filePath, buffer);

  return `/uploads/${filename}`;
}
