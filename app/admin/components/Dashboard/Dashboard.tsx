import { typoStyles, vars } from "~/admin/styles/global.css";
import { Div, Flex, P } from "~/admin/templates/Box/Box";
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

const dummyTable = [
  {
    promptName: "aa",
    description: "bb",
    category: "cc",
    view: 123,
    request: 123,
    createAt: "2021-01-01",
    recentDate: "2021-01-01",
  },
  {
    promptName: "aa",
    description: "bb",
    category: "cc",
    view: 123,
    request: 123,
    createAt: "2021-01-01",
    recentDate: "2021-01-01",
  },
  {
    promptName: "aa",
    description: "bb",
    category: "cc",
    view: 123,
    request: 123,
    createAt: "2021-01-01",
    recentDate: "2021-01-01",
  },
];

export default function Dashboard() {
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
              {data.value}명
            </P>
          </div>
        ))}
      </Flex>
      <Div>
        <P className={typoStyles["Title/24px/24px.700"]} marginBottom={"16px"}>
          인기 프롬프트
        </P>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>프롬프트명</th>
              <th className={styles.th}>설명</th>
              <th className={styles.th}>카테고리</th>
              <th className={styles.th}>조회수</th>
              <th className={styles.th}>요청수</th>
              <th className={styles.th}>생성일</th>
              <th className={styles.th}>최근 요청일</th>
            </tr>
          </thead>
          <tbody>
            {dummyTable.map((data, index) => (
              <tr key={index}>
                <td className={styles.td}>{data.promptName}</td>
                <td className={styles.td}>{data.description}</td>
                <td className={styles.td}>{data.category}</td>
                <td className={styles.td}>{data.view}</td>
                <td className={styles.td}>{data.request}</td>
                <td className={styles.td}>{data.createAt}</td>
                <td className={styles.td}>{data.recentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Div>
    </div>
  );
}
