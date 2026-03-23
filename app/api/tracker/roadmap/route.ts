import { NextResponse } from "next/server";
import { getAllTasks } from "@/lib/tracker-utils";

export async function GET() {
  try {
    const data = getAllTasks();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch roadmap" }, { status: 500 });
  }
}
