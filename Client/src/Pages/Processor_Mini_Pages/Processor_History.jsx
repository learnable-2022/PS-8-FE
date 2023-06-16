import React from "react";
import request from "../../axios";
import useSWR from "swr";
import SyncLoader from "react-spinners/SyncLoader";
import StatusBadge from "../../Components/StatusBadge";
import moment from "moment";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import DebouncedInput from "../../Components/DebouncedInput";

const fetcher = async (url) => {
  const res = await request.get(url);
  return res.data;
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
  }),

  columnHelper.accessor("employeeId", {
    header: () => "ID",
  }),
  columnHelper.accessor("emailStatus", {
    cell: (info) => <StatusBadge status={info.getValue()} />,
    header: () => "Status",
  }),
  columnHelper.accessor("jobRole", {
    header: () => "Role",
  }),
  columnHelper.accessor("appraisal", {
    header: () => "Appraisal",
  }),
  columnHelper.accessor("totalWorkingHours", {
    header: () => "Total Working hrs",
  }),
  columnHelper.accessor("yearsOfService", {
    header: () => "Years of service",
  }),
  columnHelper.accessor("bonus", {
    header: () => "Bonus",
  }),
  columnHelper.accessor("totalDeduction", {
    header: () => "Deduction",
  }),
  columnHelper.accessor((row) => row.totalSalary - row.monthlyBasePay, {
    id: "Net diff",
  }),
  columnHelper.accessor("monthlyBasePay", {
    header: () => "Base salary ($)",
  }),
  columnHelper.accessor("totalSalary", {
    header: () => "Total salary ($)",
  }),
  columnHelper.accessor((row) => moment(new Date(row.updatedAt)).format("MMMM Do, YYYY"), {
    id: "Date Disbursed",
  }),
];

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const Processor_History = () => {
  const { data, error, isLoading } = useSWR("/disbursement/fetch", fetcher);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const disbursements = data?.disbursements;

  const table = useReactTable({
    data: disbursements,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(data, error);

  if (error)
    return (
      <div className="w-full flex justify-center mt-8 p-8">
        <div className="w-[90%] rounded-lg bg-white p-10 text-xl text-center">
          An Error Occured while fetching disbursement history
        </div>
      </div>
    );

  if (isLoading)
    return (
      <div className="w-full flex justify-center mt-8 p-8">
        <div className="w-[90%] rounded-lg bg-white p-10 text-xl mx-auto flex justify-center">
          <SyncLoader color="#430359" />
        </div>
      </div>
    );

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        {disbursements?.length > 0 ? (
          <div className="w-[90%] rounded-2xl h-full bg-white mt-2 overflow-x-scroll">
            {/* history count */}
            <div className="flex m-5 justify-between">
              <span className="flex items-center gap-1">
                <span
                  className="font-semibold
                "
                >
                  Go to Page :&nbsp;
                </span>
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    table.setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16"
                />
              </span>
              <div className="flex justify-end space-x-8">
                <div>
                  <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className="p-2 font-lg shadow border border-block rounded-lg"
                    placeholder="Search all columns..."
                  />
                </div>

                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show&nbsp;&nbsp;{pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* end history count */}
            <table className="min-w-full ">
              <thead className="text-left h-[70px] text-black/70 font-medium ">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="pl-[1.5%] pr-10 whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3 text-sm pl-[1.5%] pr-10 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="m-8 flex justify-between">
              <span className="flex items-center gap-1">
                <div>Showing Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </strong>
              </span>
              <div>
                <button
                  className="px-3 py-2 ml-0 text-sm leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<Prev"}
                </button>
                <button
                  className="px-3 p-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {"Next>"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="bg-[#ffffff] w-[90%] py-[10%] mt-10 rounded-xl md:shadow-black/20 md:shadow-md">
              <p className="flex items-center justify-center text-gray-500 text-sm">
                No data found
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
