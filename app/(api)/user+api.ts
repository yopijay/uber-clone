import { neon } from "@neondatabase/serverless";

export const POST = async (request: Request) => {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { name, email, clerkId } = await request.json();

        if (!name || !email || !clerkId)
            return Response.json({ error: "Missing fields" }, { status: 400 });

        const response = await sql`
            INSERT INTO users (name, email, clerk_id) VALUES (${name}, ${email}, ${clerkId})`;

        return new Response(JSON.stringify({ data: response }), {
            status: 201,
        });
    } catch (error: any) {
        console.error("Error creating user:", error);
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};
