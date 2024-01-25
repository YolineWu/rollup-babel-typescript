/**
 * enum
 */
export enum MyEnum {
  /** key1 */
  key1 = "value1",
  /** key2 */
  key2 = "value2",
  /** key3 */
  key3 = "value3",
}

/** type */
export type MyType = {
  key1: string;
  key2: number;
};

/** const */
export const MyConst: MyType = {
  key1: MyEnum.key1,
  key2: 1,
};

/** process值替换，注意 `process.env` 中的值都是字符串 */
export const processEnvStr: string = process.env.STR_ENV_VAR;
/** process值替换，注意 `process.env` 中的值都是字符串 */
export const processEnvBool: string = process.env.BOOL_ENV_VAR;
/** process值替换，注意 `process.env` 中的值都是字符串 */
export const processEnvNum: string = process.env.NUMBER_ENV_VAR;
