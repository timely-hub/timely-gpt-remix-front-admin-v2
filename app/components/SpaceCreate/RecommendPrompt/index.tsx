import Box from "~/components/Box";
import { spaceCreateStyle } from "../styles.css";

export default function RecommendPrompt() {
  return (
    <Box margin={"0 auto"} padding={"32px 0"} width={"332px"}>
      <div className={spaceCreateStyle.title}>필수 정보 입력</div>
    </Box>
  );
}
