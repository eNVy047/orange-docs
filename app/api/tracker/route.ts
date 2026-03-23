import { NextRequest, NextResponse } from "next/server";
import { getTodayTasks, toggleTask, getAllTasks } from "@/lib/tracker-utils";

export async function GET() {
  try {
    const data = getTodayTasks();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { taskId, completed } = await req.json();
    const success = toggleTask(taskId, completed);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
