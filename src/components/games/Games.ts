import { reactive } from "vue";

export function page(num: number) {
  if (num > totalPages.value) num = totalPages.value;
  if (num < 1) num = 1;
  items.pagenum = num;
  if (!items.search) {
    setParams("", num)
    items.page = items.all.slice(
      (num - 1) * items.itemsperpage,
      num * items.itemsperpage
    );
  } else {
    setParams(items.search, num)
    items.page = filteredResults.value.slice(
      (num - 1) * items.itemsperpage,
      num * items.itemsperpage
    );
  }
}