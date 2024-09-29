// import { type PaginationOptions } from "@paybuy/cints-core/src";

// type PaginationData = { items: Record<string | number, unknown>[] };
// export function modelDataPaginator(data: PaginationData, { limit, page }: Pick<PaginationOptions, "limit" | "page">) {
//   const limitValue = limit ?? 10;
//   let items: Record<string | number, unknown>[] = [];
//   if (data.items) {
//     items = data.items;
//   }

//   const itemCount = data?.items?.length ?? 0;
//   return {
//     items,
//     limit: limitValue,
//     itemCount,
//     pageCount: Math.ceil(itemCount / limitValue),
//     page: page ?? 1
//   };
// }
