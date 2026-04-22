import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const revalidate = 60;

export default async function AdminUsersPage() {
  const rows = await db()
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(500);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Magic-link accounts (latest 500)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Directory</CardTitle>
          <CardDescription>Click a row for timeline</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Joined</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="whitespace-nowrap text-xs">
                    {u.createdAt.toISOString()}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {u.email}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    <Badge variant="outline">{u.id}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
