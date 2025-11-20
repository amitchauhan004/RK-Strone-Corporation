interface Props {
  specs?: Record<string, string | number>;
}

export default function SpecsTable({ specs }: Props) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Specifications</h3>
      <table className="w-full text-sm border-collapse">
        <tbody>
          {Object.entries(specs).map(([k, v]) => (
            <tr key={k} className="border-b last:border-b-0">
              <td className="py-2 pr-4 font-medium align-top w-1/3 text-sm text-muted-foreground">{k}</td>
              <td className="py-2 text-foreground text-sm">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
