export const spaceRoleLabel = {
  ROLE_SPACE_ADMIN: "관리자",
  ROLE_SPACE_OWNER: "소유자",
  ROLE_SPACE_USER: "멤버",
  ROLE_SPACE_GUEST: "게스트",
} as const;

export type SpaceRoleType = keyof typeof spaceRoleLabel;
export type SpaceRoleValueType = (typeof spaceRoleLabel)[SpaceRoleType];

export const isSpaceRoleType = (arg: unknown): arg is SpaceRoleType => {
  return (arg as SpaceRoleType) in spaceRoleLabel;
};
export const isSpaceRoleValueType = (
  arg: unknown
): arg is SpaceRoleValueType => {
  return Object.values(spaceRoleLabel).includes(arg as SpaceRoleValueType);
};

export const spaceGradeLabel = {
  basic: "영업용(체험판)",
  premium: "베이직",
  master: "프로",
};

export type SpaceGradeType = keyof typeof spaceGradeLabel;
export type SpaceGradeValueType = (typeof spaceGradeLabel)[SpaceGradeType];

export const isSpaceGradeType = (arg: unknown): arg is SpaceGradeType => {
  return (arg as SpaceGradeType) in spaceGradeLabel;
};

export const isSpaceGradeValueType = (
  arg: unknown
): arg is SpaceGradeValueType => {
  return Object.values(spaceGradeLabel).includes(arg as SpaceGradeValueType);
};
