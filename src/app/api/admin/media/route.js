import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { getCloudinary } from "@/lib/cloudinary";

const allowed = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];
export async function POST(request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await request.formData();
    const file = data.get("file");
    if (!file || typeof file === "string")
      return NextResponse.json({ error: "Choose a file." }, { status: 400 });
    if (!allowed.includes(file.type) || file.size > 25 * 1024 * 1024)
      return NextResponse.json(
        { error: "Use JPG, PNG, WebP, MP4, WebM or MOV up to 25MB." },
        { status: 400 },
      );
    const buffer = Buffer.from(await file.arrayBuffer());
    const resourceType = file.type.startsWith("video/") ? "video" : "image";
    const result = await new Promise((resolve, reject) =>
      getCloudinary()
        .uploader.upload_stream(
          { folder: "jsp-real-estate/properties", resource_type: resourceType },
          (error, value) => (error ? reject(error) : resolve(value)),
        )
        .end(buffer),
    );
    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Upload failed." },
      { status: 500 },
    );
  }
}
