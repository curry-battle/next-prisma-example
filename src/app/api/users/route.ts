import { saveNewUser } from "@/backend/usecases/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return handlePost(req);
}

// create new
export async function handlePost(req: NextRequest) {
  // get request body
  const formData = await req.formData();
  const requestParams = Object.fromEntries(Array.from(formData.entries()));

  const saveRes = await saveNewUser(requestParams);

  if (saveRes.isFailure) {
    const error = saveRes.value;
    return NextResponse.json(
      { error: error.messageForClient },
      { status: error.statusCode }
    );
  }

  return NextResponse.json(
    { message: "success", userId: saveRes.value },
    { status: 200 }
  );
}
