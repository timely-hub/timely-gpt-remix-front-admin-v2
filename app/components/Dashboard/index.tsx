import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Buttons from "~/components/Box/Buttons";
import {
  promptTableData,
  recentCreatePromptTableData,
  recentUserTableData,
  spaceTableData,
} from "~/data/index";
import { PromptTable, SpaceTable, UserTable } from "~/types/statistic.types";
import { thousand } from "~/utils/helpers";
import Box from "../Box";
import { dashboardStyle } from "./styles.css";

const dummyData = [
  {
    label: "전체 유저",
    value: 1292,
  },
  {
    label: "스페이스 갯수",
    value: 32,
  },
  {
    label: "스토어 프롬프트 갯수",
    value: 4321,
  },
  {
    label: "1일전 총 사용량",
    value: 4321,
  },
  {
    label: "한달 총 사용량",
    value: 124321,
  },
];

export default function Dashboard() {
  const tableData = {
    promptData: [...promptTableData] as PromptTable[],
    recentUserData: [...recentUserTableData] as UserTable[],
    recentCreateSpaceData: [...spaceTableData] as SpaceTable[],
    recentCreatePromptData: [...recentCreatePromptTableData] as PromptTable[],
  };

  const tableHelpers = {
    promptTableHelper: createColumnHelper<PromptTable>(),
    userTableHelper: createColumnHelper<UserTable>(),
    spaceTableHelper: createColumnHelper<SpaceTable>(),
    recentCreatePromptTableHelper: createColumnHelper<PromptTable>(),
  };

  const columns = {
    promptColumns: [
      tableHelpers.promptTableHelper.accessor("promptName", {
        header: "프롬프트명",
      }),
      tableHelpers.promptTableHelper.accessor("description", {
        header: "설명",
      }),
      tableHelpers.promptTableHelper.accessor("category", {
        header: "카테고리",
      }),
      tableHelpers.promptTableHelper.accessor("view", { header: "조회수" }),
      tableHelpers.promptTableHelper.accessor("request", { header: "요청수" }),
      tableHelpers.promptTableHelper.accessor("createAt", { header: "생성일" }),
      tableHelpers.promptTableHelper.accessor("recentRequestAt", {
        header: "최근 요청일",
      }),
    ],
    userColumns: [
      tableHelpers.userTableHelper.accessor("name", { header: "이름" }),
      tableHelpers.userTableHelper.accessor("email", { header: "이메일" }),
      tableHelpers.userTableHelper.accessor("space", { header: "스페이스" }),
      tableHelpers.userTableHelper.accessor("type", { header: "타입" }),
      tableHelpers.userTableHelper.accessor("connectCount", {
        header: "접속횟수",
      }),
      tableHelpers.userTableHelper.accessor("requestCount", {
        header: "요청횟수",
      }),
      tableHelpers.userTableHelper.accessor("signInAt", { header: "가입일" }),
    ],
    spaceColumns: [
      tableHelpers.spaceTableHelper.accessor("space", { header: "스페이스명" }),
      tableHelpers.spaceTableHelper.accessor("domain", { header: "도메인" }),
      tableHelpers.spaceTableHelper.accessor("memberCount", {
        header: "멤버 수",
      }),
      tableHelpers.spaceTableHelper.accessor("promptCount", {
        header: "프롬프트 수",
      }),
      tableHelpers.spaceTableHelper.accessor("totalToken", {
        header: "총 할당 토큰",
      }),
      tableHelpers.spaceTableHelper.accessor("totalUseToken", {
        header: "총 사용 토큰",
      }),
      tableHelpers.spaceTableHelper.accessor("remainingToken", {
        header: "총 남은 토큰",
      }),
      tableHelpers.spaceTableHelper.accessor("user", { header: "소유자" }),
      tableHelpers.spaceTableHelper.accessor("createAt", { header: "생성일" }),
    ],
    recentCreatePromptColumns: [
      tableHelpers.recentCreatePromptTableHelper.accessor("promptName", {
        header: "프롬프트명",
      }),
      tableHelpers.recentCreatePromptTableHelper.accessor("category", {
        header: "카테고리",
      }),
      tableHelpers.recentCreatePromptTableHelper.accessor("view", {
        header: "조회수",
      }),
      tableHelpers.recentCreatePromptTableHelper.accessor("request", {
        header: "요청수",
      }),
      tableHelpers.recentCreatePromptTableHelper.accessor("createAt", {
        header: "생성일",
      }),
      tableHelpers.recentCreatePromptTableHelper.accessor("recentRequestAt", {
        header: "최근 요청일",
      }),
    ],
  };

  const promptTable = useReactTable({
    data: tableData.promptData,
    columns: columns.promptColumns,
    getCoreRowModel: getCoreRowModel<PromptTable>(),
  });

  const userTable = useReactTable({
    data: tableData.recentUserData,
    columns: columns.userColumns,
    getCoreRowModel: getCoreRowModel<UserTable>(),
  });

  const spaceTable = useReactTable({
    data: tableData.recentCreateSpaceData,
    columns: columns.spaceColumns,
    getCoreRowModel: getCoreRowModel<SpaceTable>(),
  });

  const recentCreatePromptTable = useReactTable({
    data: tableData.recentCreatePromptData,
    columns: columns.recentCreatePromptColumns,
    getCoreRowModel: getCoreRowModel<PromptTable>(),
  });
  return (
    <div className={dashboardStyle.container}>
      <Box gap={"8px"} display={"flex"}>
        {dummyData.map((data, index) => (
          <div key={index} className={dashboardStyle.statisticsTab}>
            <p>{data.label}</p>
            <p className={dashboardStyle.boxTitle}>{thousand(data.value)}명</p>
          </div>
        ))}
      </Box>
      <div>
        <p className={dashboardStyle.boxTitle}>인기 프롬프트</p>
        <table className={dashboardStyle.tableBorderBottom}>
          <thead>
            {promptTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={dashboardStyle.thBorderBottom} key={header.id}>
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
            {promptTable.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className={dashboardStyle.tdBorderNone} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p className={dashboardStyle.boxTitle}>최근 가입 유저</p>
        <table className={dashboardStyle.table}>
          <thead>
            {userTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={dashboardStyle.th} key={header.id}>
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
            {userTable.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className={dashboardStyle.td} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p className={dashboardStyle.boxTitle}>최근 생성 스페이스</p>
        <table className={dashboardStyle.table}>
          <thead>
            {spaceTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={dashboardStyle.th} key={header.id}>
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
            {spaceTable.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className={dashboardStyle.td} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p className={dashboardStyle.boxTitle}>최근 생성 프롬프트</p>
        <table className={dashboardStyle.table}>
          <thead>
            {recentCreatePromptTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={dashboardStyle.th} key={header.id}>
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
            {recentCreatePromptTable.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className={dashboardStyle.td} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Buttons>gkdl</Buttons>
    </div>
  );
}
