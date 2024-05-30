import { useNavigate } from "@remix-run/react";
import { vars } from "~/styles/vars.css";
import { spaceGradeLabel } from "~/types/enum.types";
import Box from "../Box";
import Buttons from "../Box/Buttons";
import CalendarInput from "../Box/CalendarInput";
import DropDown, { parserForObject } from "../Box/DropDown";
import LabelBox from "../Box/LabelBox";
import TextInput from "../Box/TextInput";
import { spaceCreateStyle } from "./styles.css";

export default function SpaceCreate() {
  const navigate = useNavigate();
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
          <CalendarInput></CalendarInput>
        </Box>
        <Box>
          <LabelBox label={"결제 등급"}></LabelBox>
          <DropDown
            width={"100%"}
            list={parserForObject(spaceGradeLabel).map((item) =>
              item.key === "master" ? { ...item, disabled: true } : item
            )}
          />
        </Box>
        <Box
          border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
          borderRadius={"16px"}
          padding={"16px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"8px"}
        >
          <Box>
            <LabelBox label={"입금자명"}></LabelBox>
            <TextInput
              placeholder="입금자명 입력"
              wrapSprinkles={{ width: "100%" }}
            ></TextInput>
          </Box>
          <Box>
            <LabelBox label={"결제 방식"}></LabelBox>
            <TextInput
              placeholder="결제 방식 입력"
              wrapSprinkles={{ width: "100%" }}
            ></TextInput>
          </Box>
          <Box>
            <LabelBox label={"결제 금액"}></LabelBox>
            <TextInput
              placeholder="결제 금액 입력"
              wrapSprinkles={{ width: "100%" }}
            ></TextInput>
          </Box>
          <Box>
            <LabelBox label={"업체 정보"}></LabelBox>
            <TextInput
              placeholder="업체 정보 입력"
              wrapSprinkles={{ width: "100%" }}
            ></TextInput>
          </Box>
        </Box>
        <Buttons
          onClick={() => {
            navigate("/space/create/prompt-package");
          }}
        >
          다음 단계
        </Buttons>
      </Box>
    </Box>
  );
}
