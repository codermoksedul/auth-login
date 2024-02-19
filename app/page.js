import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <main>
      <h1>Home Page</h1>
    </main>
    );
}