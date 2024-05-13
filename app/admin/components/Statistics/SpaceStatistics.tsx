import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { spaceTableData } from "~/admin/data/tableData";
import { SpaceTable } from "~/admin/types/statistic.types";
import dashBoardStyles from "../Dashboard/Dashboard.css";

export default function SpaceStatistics() {
  const data = [...spaceTableData] as SpaceTable[];

  const columnHelper = createColumnHelper<SpaceTable>();
  const columns = [
    columnHelper.accessor("space", { header: "이름" }),
    columnHelper.accessor("domain", { header: "도메인" }),
    columnHelper.accessor("memberCount", { header: "멤버 수" }),
    columnHelper.accessor("promptCount", { header: "프롬프트 수" }),
    columnHelper.accessor("totalToken", { header: "총 토큰" }),
    columnHelper.accessor("totalUseToken", { header: "사용한 토큰" }),
    columnHelper.accessor("user", { header: "유저" }),
    columnHelper.accessor("createAt", { header: "생성일" }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<SpaceTable>(),
  });

  const styles = dashBoardStyles;

  return (
    <div>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
