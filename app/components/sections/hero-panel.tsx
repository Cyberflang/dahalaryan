import { person } from "../../lib/site-data";

/** Profile photo used as the hero's visual anchor. */
export function HeroPanel() {
  return (
    <div className="relative w-48 max-w-full sm:w-64 lg:w-full lg:max-w-sm">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-line bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export has no Image Optimization API; this is a single local asset. */}
        <img
          src="/aryan-photo.jpg"
          alt={person.name}
          className="h-full w-full object-cover object-[50%_20%]"
        />
      </div>
    </div>
  );
}
