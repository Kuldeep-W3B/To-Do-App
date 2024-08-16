import dbConnect from "@/app/utils/coonDb";
import Todo from "@/app/models/todo";

export async function DELETE(req) {
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

    const deletedTodo = await Todo.findByIdAndDelete(id);

    console.log('Deleted Todo:', deletedTodo);

    if (!deletedTodo) {
      return new Response(JSON.stringify({ error: "Todo not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error('Delete Error:', error);
    return new Response(JSON.stringify({ error: "Failed to delete todo" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}