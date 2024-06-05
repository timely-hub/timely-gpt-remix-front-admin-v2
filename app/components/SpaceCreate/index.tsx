import { useFetcher, useNavigate } from "@remix-run/react";
import localForage from "localforage";
import { debounce } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { MemberSearchType } from "~/Services/space-controller/space-controller.types";
import useBulkState from "~/hooks/useBulkState";
import { loader } from "~/routes/api.get-member-live";
import { vars } from "~/styles/vars.css";
import { spaceGradeLabel } from "~/types/enum.types";
import { SpaceMainType, defaultSpaceMainType } from "~/types/shared.types";
import Box from "../Box";
import Buttons from "../Box/Buttons";
import CalendarInput from "../Box/CalendarInput";
import DropDown, { parserForObject } from "../Box/DropDown";
import LabelBox from "../Box/LabelBox";
import TextInput from "../Box/TextInput";
import { spaceCreateStyle } from "./styles.css";

export default function SpaceCreate() {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof loader>();
  const { state, setState } = useBulkState<SpaceMainType>(defaultSpaceMainType);
  const [memberData, setMemberData] = useState<
    MemberSearchType[] | undefined | null
  >();

  useEffect(() => {
    if (fetcher.state === "idle") {
      setMemberData(fetcher.data?.response);
      console.log(memberData);
    }
  }, [fetcher, memberData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchMembers = useCallback(
    debounce((search: string) => {
      const formData = new FormData();
      formData.append("search", search);
      fetcher.submit(formData, {
        action: `/api/get-member-live?search=${search}`,
      });
    }, 300), // 300ms 지연
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState("ownerId", value);
    debouncedFetchMembers(value);
  };

  return (
    <Box margin={"0 auto"} padding={"32px 0"} width={"332px"}>
      <div className={spaceCreateStyle.title}>필수 정보 입력</div>
      <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
        <Box>
          <LabelBox label={"스페이스 명"} />
          <TextInput
            placeholder="스페이스명 입력"
            wrapSprinkles={{ width: "100%" }}
            onChange={(e) => {
              setState("name", e.target.value);
            }}
          ></TextInput>
        </Box>
        <Box>
          <LabelBox label={"도메인"} />
          <TextInput
            placeholder="도메인명 입력"
            wrapSprinkles={{ width: "100%" }}
            onChange={(e) => {
              setState("domain", e.target.value);
            }}
          ></TextInput>
        </Box>
        <Box>
          <LabelBox label={"계정 선택"} />
          <TextInput
            placeholder="계정 검색"
            wrapSprinkles={{ width: "100%" }}
            onChange={handleSearchChange}
          ></TextInput>
        </Box>
        <Box>
          <LabelBox label={"만료일 지정"} />
          <CalendarInput
            value={state.expiredAt}
            onChange={(date) => {
              setState("expiredAt", date.isoDate);
              console.log(date);
            }}
          ></CalendarInput>
        </Box>
        <Box>
          <LabelBox label={"결제 등급"}></LabelBox>
          <DropDown
            width={"100%"}
            list={parserForObject(spaceGradeLabel)}
            onChange={(value) => {
              setState("grade", value?.key || null);
            }}
            value={state?.grade ? { key: state.grade, label: "" } : null}
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
              onChange={(e) => {
                setState("spacePayment.payerName", e.target.value);
              }}
            ></TextInput>
          </Box>
          <Box>
            <LabelBox label={"결제 방식"}></LabelBox>
            <TextInput
              placeholder="결제 방식 입력"
              wrapSprinkles={{ width: "100%" }}
              onChange={(e) => {
                setState("spacePayment.type", e.target.value);
              }}
            ></TextInput>
          </Box>
          <Box>
            <LabelBox label={"결제 금액"}></LabelBox>
            <TextInput
              placeholder="결제 금액 입력"
              wrapSprinkles={{ width: "100%" }}
              onChange={(e) => {
                setState("spacePayment.amount", Number(e.target.value));
              }}
            ></TextInput>
          </Box>
          <Box>
            <LabelBox label={"업체 정보"}></LabelBox>
            <TextInput
              placeholder="업체 정보 입력"
              wrapSprinkles={{ width: "100%" }}
              onChange={(e) => {
                setState("spacePayment.description", e.target.value);
              }}
            ></TextInput>
          </Box>
        </Box>
        <Buttons
          onClick={() => {
            localForage.setItem("spaceMain", state);
            navigate("/space/create/prompt-package");
          }}
        >
          다음 단계
        </Buttons>
      </Box>
    </Box>
  );
}
