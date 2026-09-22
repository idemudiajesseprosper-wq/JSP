import PropertyCard from "@/components/PropertyCard";
import { PageNav } from "@/components/SectionPage";
import { getPublishedProperties } from "@/lib/properties";
export const metadata = {
  title: "Browse Properties | J.S.P. Real Estate",
  description: "Browse published JSP properties available for rent and sale.",
};
export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;
  const filters = {
    search: String(params.search || ""),
    type: String(params.type || ""),
    listing: String(params.listing || ""),
    location: String(params.location || ""),
  };
  const properties = await getPublishedProperties(filters);
  return (
    <>
      <PageNav />
      <main>
        <section className="property-page-head">
          <div className="shell">
            <span className="eyebrow">Property discovery</span>
            <h1>Find Your Next Property</h1>
            <p>
              No signup or login required. Search, filter and contact JSP
              directly.
            </p>
          </div>
        </section>
        <section className="shell property-browser">
          <form className="property-filters">
            <input
              name="search"
              placeholder="Search property or location"
              defaultValue={filters.search}
            />
            <select name="type" defaultValue={filters.type}>
              <option value="">All property types</option>
              <option value="house">Houses</option>
              <option value="apartment">Apartments</option>
              <option value="flat">Flats</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
            <select name="listing" defaultValue={filters.listing}>
              <option value="">Rent or sale</option>
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
            <input
              name="location"
              placeholder="Location"
              defaultValue={filters.location}
            />
            <button type="submit" className="button">
              Apply Filters
            </button>
          </form>
          {properties.length ? (
            <div className="public-property-grid">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No published properties match</h2>
              <p>
                Try removing a filter or contact JSP for help finding a suitable
                property.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
