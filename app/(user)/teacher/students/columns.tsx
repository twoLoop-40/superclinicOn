"use client";

import { ColumnDef } from "@tanstack/react-table";

export type StudentTableColumn = {
  username: string;
  email: string;
  matacode: number;
  phone: string;
  parentPhone: string;
};

export const columns: ColumnDef<StudentTableColumn>[] = [
  {
    accessorKey: "username",
    header: "이름",
  },
  {
    accessorKey: "email",
    header: "이메일",
  },
  {
    accessorKey: "matacode",
    header: "마타코드",
  },
  {
    accessorKey: "phone",
    header: "전화번호",
  },
  {
    accessorKey: "parentPhone",
    header: "부모님 전화번호",
  },
];
