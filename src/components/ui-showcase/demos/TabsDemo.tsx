import { Tabs, TabsList, TabsTrigger, TabsContent } from "@miethe/ui/primitives";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="changelog">Changelog</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="py-3 text-sm">
        Radix-powered Tabs primitive with keyboard support out of the box.
      </TabsContent>
      <TabsContent value="api" className="py-3 text-sm">
        Composed of <code>Tabs</code>, <code>TabsList</code>,{" "}
        <code>TabsTrigger</code>, and <code>TabsContent</code>.
      </TabsContent>
      <TabsContent value="changelog" className="py-3 text-sm">
        Added in 0.2.0 alongside the rest of the primitives submodule.
      </TabsContent>
    </Tabs>
  );
}
