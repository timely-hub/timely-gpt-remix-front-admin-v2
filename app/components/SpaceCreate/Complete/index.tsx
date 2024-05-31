import localForage from "localforage";
import Box from "~/components/Box";
import { spaceCreateStyle } from "../styles.css";
import { SpaceMainType, defaultSpaceMainType } from "~/types/shared.types";
import useBulkState from "~/hooks/useBulkState";
import { useEffect } from "react";
import { ApiResponseType } from "~/types/api";
import toastSlice, { callToast } from "~/zustand/toastSlice";

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
      console.log(state);
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
