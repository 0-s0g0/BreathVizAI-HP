import { ja } from './locales/ja';

/**
 * 完全に型安全なドット記法生成型
 */
type DeepKeys<T, P extends string = ""> = {
  readonly [K in keyof T]: T[K] extends (...args: never[]) => unknown
    ? P extends "" ? K & string : `${P}.${K & string}`
    : T[K] extends readonly unknown[]
    ? P extends "" ? K & string : `${P}.${K & string}`
    : T[K] extends object
    ? DeepKeys<T[K], P extends "" ? K & string : `${P}.${K & string}`>
    : P extends "" ? K & string : `${P}.${K & string}`;
};

/**
 * anyを一切排除した実装
 */
function createKeys<T extends Record<string, unknown>>(
  obj: T,
  prefix = ""
): DeepKeys<T> {
  const result = {} as Record<string, unknown>;

  for (const key in obj) {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      typeof value !== "function"
    ) {
      // 再帰
      result[key] = createKeys(value as Record<string, unknown>, fullKey);
    } else {
      // 末端のパス（関数、配列、プリミティブ値）
      result[key] = fullKey;
    }
  }

  return result as DeepKeys<T>;
}

// ja の型から tKeys を生成
export const tKeys = createKeys(ja as Record<string, unknown>) as DeepKeys<typeof ja>;