export const chunk = <Type>(size: number, list: Type[]): Type[][] =>
    list.reduce(
      (segments, _, index) =>
        index % size === 0
          ? [...segments, list.slice(index, index + size)]
          : segments,
      [] as Type[][]
    );