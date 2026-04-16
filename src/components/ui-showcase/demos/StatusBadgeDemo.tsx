import { StatusBadge } from "@miethe/ui/primitives";

export function StatusBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <StatusBadge status="draft" />
      <StatusBadge status="published" />
      <StatusBadge
        status="active"
        statusColorMap={{ active: "default" }}
      />
      <StatusBadge status="deprecated" />
      <StatusBadge status="archived" />
    </div>
  );
}
