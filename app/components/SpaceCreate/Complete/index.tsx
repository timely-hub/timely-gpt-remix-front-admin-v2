import localForage from "localforage";
import { useEffect } from "react";
import Box from "~/components/Box";
import useBulkState from "~/hooks/useBulkState";
import { ApiResponseType } from "~/types/api";
import { SpaceMainType, defaultSpaceMainType } from "~/types/shared.types";
import { callToast } from "~/zustand/toastSlice";
import { spaceCreateStyle } from "../styles.css";

const getSpaceMain = async () => {
  const response = await localForage.getItem("spaceMain");
  return response as SpaceMainType;
};

const createSpace = async (spaceData: SpaceMainType) => {
  const response = await fetch(`/api/space-create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spaceData),
  });
  return (await response.json()) as ApiResponseType<string>;
};

export default function SpaceComplete() {
  const { state, init } = useBulkState<SpaceMainType>(defaultSpaceMainType);

  useEffect(() => {
    getSpaceMain().then((data) => {
      init(data);
    });
  }, [init]);

  useEffect(() => {
    createSpace(state).then((response) => {
      if (response.success) {
        callToast("스페이스가 생성되었습니다.", "success");
      } else {
        callToast(response.message, "error");
      }
    });
  }, [state]);
  return (
    <Box margin={"0 auto"} padding={"32px 0"} width={"332px"}>
      <div className={spaceCreateStyle.title}>스페이스 생성 중</div>
    </Box>
  );
}
