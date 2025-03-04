import SearchBy from "@/components/SearchBy";

export default async function Filter({
  params,
}: {
  params: Promise<{ type: string; value: string }>;
}) {
  const { type, value } = await params;

  return (
    <div>
      <SearchBy type={type} value={value} />
    </div>
  );
}
