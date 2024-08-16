import dbConnect from "@/app/utils/coonDb";
import Todo from "@/app/models/todo";

export async function POST(req) {
  await dbConnect();

  try {
    const { title, description } = await req.json();
    const newTodo = new Todo({
      title,
      description,
    });

    await newTodo.save();
    return new Response(JSON.stringify(newTodo), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add todo" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
