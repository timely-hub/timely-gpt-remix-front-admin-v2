import { vars } from "~/styles/vars.css";
import Box from "..";
import { loaderStyles } from "./styles.css";

export default function Loading() {
  return (
    <>
      <Box
        position={"absolute"}
        width={"100vw"}
        height={"100%"}
        left={"0"}
        top={"0"}
        backgroundColor={vars.colors["Grayscale/Gray 100"]}
        opacity={"0.5"}
        zIndex={"100"}
      ></Box>
      <div className={loaderStyles.loader}>Loading....</div>
    </>
  );
}
