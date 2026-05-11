import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
);

export async function POST(request: NextRequest) {
  const { name, message } = await request.json();

  if (!name || !message)
    return NextResponse.json(
      { error: "Nama dan pesan harus diisi" },
      { status: 400 }
    );
  if (message.length > 200)
    return NextResponse.json(
      { error: "Pesan tidak boleh lebih dari 200 karakter" },
      { status: 400 }
    );

  try {
    const { error } = await supabaseServer.from("messages").insert({
      name,
      message,
      is_anonymous: true,
    });

    if (error) {
      console.error("Error sending message", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error sending message", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
