"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
export async function Search({ category }: { category: string }) {
  const searchParamsParser: any = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParamsParser);

  const pathname = usePathname();
  const { replace } = useRouter();

  async function updateParams(category: string, value: any, params: any) {
      if (value != "Alle") {
        params.set(category, value);
      } else {
        params.delete(category);
      }
      await replace(`${pathname}?${params.toString()}`);
    };

  return (
    <input
      type="text"
      className="input drop-shadow-lg self-center mb-6 text-lg w-3/12 min-w-80"
      placeholder="Spielername"
      onChange={(e: any) => {
        updateParams(category, e.target.value, currentSearchParams);
      }}
      value={currentSearchParams?.get(category)?.toString()}
    />
  );
}
