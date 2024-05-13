import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  promptTableData,
  recentCreatePromptTableData,
  recentUserTableData,
  spaceTableData,
} from "~/admin/data/tableData";
import { typoStyles, vars } from "~/admin/styles/global.css";
import { Div, Flex, P } from "~/admin/templates/Box/Box";
import {
  PromptTable,
  SpaceTable,
  UserTable,
} from "~/admin/types/statistic.types";
import { thousand } from "~/utils/helpers";
import dashBoardStyles from "./Dashboard.css";

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

  const styles = dashBoardStyles;
  return (
    <div className={styles.container}>
      <Flex gap={"8px"}>
        {dummyData.map((data, index) => (
          <div key={index} className={styles.statisticsTab}>
            <P
              className={typoStyles["Body/16px/16px.500"]}
              color={vars.colors.Grayscale_Gray500}
              margin={"0 0 8px 0"}
            >
              {data.label}
            </P>
            <P
              className={typoStyles["Title/24px/24px.700"]}
              margin={"0"}
              textAlign={"right"}
            >
              {thousand(data.value)}명
            </P>
          </div>
        ))}
      </Flex>
      <Div>
        <P className={typoStyles["Title/24px/24px.700"]} marginBottom={"16px"}>
          인기 프롬프트
        </P>
        <table className={styles.tableBorderBottom}>
          <thead>
            {promptTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={styles.thBorderBottom} key={header.id}>
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
                  <td className={styles.tdBorderNone} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Div>
      <Div>
        <P className={typoStyles["Title/24px/24px.700"]} marginBottom={"16px"}>
          최근 가입 유저
        </P>
        <table className={styles.table}>
          <thead>
            {userTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={styles.th} key={header.id}>
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
                  <td className={styles.td} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Div>
      <Div>
        <P className={typoStyles["Title/24px/24px.700"]} marginBottom={"16px"}>
          최근 생성 스페이스
        </P>
        <table className={styles.table}>
          <thead>
            {spaceTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={styles.th} key={header.id}>
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
                  <td className={styles.td} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Div>
      <Div>
        <P className={typoStyles["Title/24px/24px.700"]} marginBottom={"16px"}>
          최근 생성 프롬프트
        </P>
        <table className={styles.table}>
          <thead>
            {recentCreatePromptTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={styles.th} key={header.id}>
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
                  <td className={styles.td} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Div>
    </div>
  );
}
