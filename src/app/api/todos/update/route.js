import dbConnect from "@/app/utils/coonDb";
import Todo from "@/app/models/todo";

export async function PUT(req) {
  await dbConnect();

  try {
    const url = new URL(req.url, `http://${req.headers.host}`); // Ensure full URL for URL constructor
    const id = url.searchParams.get('id'); // Get 'id' from query parameters

    console.log('Extracted ID:', id);

    if (!id) {
      return new Response(JSON.stringify({ error: "ID parameter is missing" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const { title, description } = await req.json();
    console.log('Request Body:', { title, description });

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    console.log('Updated Todo:', updatedTodo);

    if (!updatedTodo) {
      return new Response(JSON.stringify({ error: "Todo not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(updatedTodo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Update Error:', error);
    return new Response(JSON.stringify({ error: "Failed to update todo" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}