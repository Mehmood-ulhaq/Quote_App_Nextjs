// app/api/quotes/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NINJA_API_KEY;

  try {
    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey!,
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch quotes", error);
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}
