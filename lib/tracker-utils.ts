import fs from "fs";
import path from "path";

const TASKS_FILE = path.join(process.cwd(), "data/tracker/tasks.json");

export interface Task {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  time: string;
}

export interface DayPlan {
  day: number;
  date: string;
  tasks: Task[];
}

export function getAllTasks(): DayPlan[] {
  try {
    const data = fs.readFileSync(TASKS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tasks file:", error);
    return [];
  }
}

export function saveAllTasks(plans: DayPlan[]) {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(plans, null, 2));
  } catch (error) {
    console.error("Error saving tasks file:", error);
  }
}

export function getTodayTasks() {
  const allPlans = getAllTasks();
  const todayStr = new Date().toISOString().split("T")[0];
  
  // Find current day's plan
  let currentDayPlan = allPlans.find(p => p.date === todayStr);
  
  // If not found, find the latest day before or at today
  if (!currentDayPlan) {
    currentDayPlan = allPlans.reduce((prev, curr) => {
      return (curr.date <= todayStr) ? curr : prev;
    }, allPlans[0]);
  }

  // Handle Rollover: Combine pending tasks from all previous days
  const backlog: Task[] = [];
  allPlans.forEach(plan => {
    if (plan.date < todayStr) {
      plan.tasks.forEach(task => {
        if (!task.completed) {
          backlog.push({
            ...task,
            text: `[Rollover] ${task.text} (${plan.date})`
          });
        }
      });
    }
  });

  return {
    day: currentDayPlan.day,
    date: todayStr,
    tasks: currentDayPlan.tasks,
    backlog: backlog
  };
}

export function toggleTask(taskId: string, completed: boolean) {
  const allPlans = getAllTasks();
  let updated = false;

  for (const plan of allPlans) {
    const task = plan.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = completed;
      updated = true;
      break;
    }
  }

  if (updated) {
    saveAllTasks(allPlans);
  }
  return updated;
}
