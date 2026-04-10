import { getSession } from "@/lib/auth/session";
import { BookFlow } from "./book-flow";

export default async function BookPage() {
  const session = await getSession();
  return <BookFlow receiptEmailDefault={session?.email ?? null} />;
}
