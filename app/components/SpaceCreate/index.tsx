import Box from "../Box";
import LabelBox from "../Box/LabelBox";
import TextInput from "../Box/TextInput";
import { spaceCreateStyle } from "./styles.css";

export default function SpaceCreate() {
  return (
    <Box margin={"0 auto"} padding={"32px 0"} width={"332px"}>
      <div className={spaceCreateStyle.title}>필수 정보 입력</div>
      <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
        <Box>
          <LabelBox label={"스페이스 명"} />
          <TextInput
            placeholder="스페이스명 입력"
            wrapSprinkles={{ width: "100%" }}
          ></TextInput>
        </Box>
        <Box>
          <LabelBox label={"도메인"} />
          <TextInput
            placeholder="도메인명 입력"
            wrapSprinkles={{ width: "100%" }}
          ></TextInput>
        </Box>
        <Box>
          <LabelBox label={"계정 선택"} />
          <TextInput
            placeholder="계정 검색"
            wrapSprinkles={{ width: "100%" }}
          ></TextInput>
        </Box>
        <Box>
          <LabelBox label={"만료일 지정"} />
        </Box>
      </Box>
    </Box>
  );
}
