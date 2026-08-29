import type { ForumCategoryGroup } from "../../lib/forum-data";
import { CategoryCard } from "./category-card";

export function CategoryGroup({ group }: { group: ForumCategoryGroup }) {
  return (
    <section aria-labelledby={`group-${group.id}`} className="scroll-mt-24">
      <h2
        id={`group-${group.id}`}
        className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent"
      >
        {group.label}
      </h2>
      <div className="flex flex-col gap-3">
        {group.categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
