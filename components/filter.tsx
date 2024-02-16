"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export async function Filter({
  category,
  options,
}: {
  category: string;
  options: any;
}) {
  const searchParamsParser: any = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParamsParser);

  const pathname = usePathname();
  const { replace } = useRouter();

  function updateParams(category: string, value: any, params: any) {
    if (value != "Alle") {
      params.set(category, value);
    } else {
      params.delete(category);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mx-5">
      <div className="label">
        <span className="label-text">{category}</span>
      </div>
      <select
        onInput={(e: any) => {
          console.log(e)
          updateParams(category, e.target.value, currentSearchParams);
        }}
        defaultValue={currentSearchParams?.get(category)?.toString()}
        className="select select-bordered w-full max-w-xs select-sm rounded-lg"
      >
        <option key="defaultOption" value={undefined}>Alle</option>
        {options.map(({ id, name }: { id: any; name: string }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
