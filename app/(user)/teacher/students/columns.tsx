"use client";

import { Checkbox } from "@components/ui/checkbox";
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "이름",
  },
  {
    accessorKey: "email",
    header: "이메일",
  },
  {
    accessorKey: "mataCode",
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
