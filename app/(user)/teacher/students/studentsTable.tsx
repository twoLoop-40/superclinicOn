"use client";
import { Student, User } from "@prisma/client";

type StudentsTableProps = {
  students: (Student & { user: User })[];
};

const StudentsTable = ({ students }: StudentsTableProps) => {
  return (
    <div>
      <h1>Students Table</h1>
    </div>
  );
};

export default StudentsTable;
