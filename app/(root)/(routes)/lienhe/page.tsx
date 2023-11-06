import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import getCurrentUser from "@/actions/get-current-user";

const TaiKhoanPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-in");
  }

  const schools = await db.school.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={schools} />
    </div>
  );
};

export default TaiKhoanPage;
