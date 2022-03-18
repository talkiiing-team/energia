export type Tagged<Tag extends string, Value = unknown> = {
  readonly _tag: Tag
  readonly value: Value
}

export const createTagged = <Tag extends string, Value = unknown>(
  tag: Tag,
  value: Value,
): Tagged<Tag, Value> => ({ _tag: tag, value })

export const getTag = <Tag extends string, Value = unknown>({
  _tag,
}: Tagged<Tag, Value>): Tag => _tag

export const getValue = <Tag extends string, Value = unknown>({
  value,
}: Tagged<Tag, Value>): Value => value

export const isTagged = <Tag extends string, Value = unknown>(
  obj: unknown,
): obj is Tagged<Tag, Value> =>
  typeof obj === 'object' &&
  obj !== null &&
  typeof (<Record<string, unknown>>obj)._tag === 'string'
