import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getUserInfo } from "~/Services/user-controller/get-user-by-id.server";
import UserInfoComponent from "~/components/User/UserInfo";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;
  const userInfoData = await getUserInfo(args)(id || "");
  return json({ userInfoData: userInfoData?.data });
};

export default function UserInfoPage() {
  return <UserInfoComponent />;
}
