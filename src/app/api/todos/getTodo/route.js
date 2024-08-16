import dbConnect from "@/app/utils/coonDb";
import Todo from "@/app/models/todo";

export async function GET(req, res) {
  await dbConnect();

  try {
    const todos = await Todo.find({});
    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch todos" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
