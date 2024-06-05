import { MemberType } from "../space-statistics-controller/space-statistics-controller.types";

export type CategoryType = {
  id: number;
  displayOrder: number;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type PackagePromptListCursorType = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  member: MemberType;
  categoryId: number;
  categoryLabel: string;
  llmModelType: string;
  llmModelCategoryType: string;
  viewCount: number;
  bookmarkCount: number;
  executeCount: number;
  bookmarkCountSnapshot: number;
  createdAt: string;
  updatedAt: string;
};
