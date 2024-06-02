import { LoaderFunctionArgs } from "@remix-run/node";
import getCategoryList from "~/Services/store-controller/get-category-list.server";
import CategoryManagementComponent from "~/components/Store/Category";

export const loader = async (args: LoaderFunctionArgs) => {
  const categoryList = await getCategoryList(args);
  return {
    categoryList: categoryList?.data,
  };
};

export default function StoreCategoryPage() {
  return <CategoryManagementComponent />;
}
