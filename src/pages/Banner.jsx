import BannerSection from "../components/BannerSection";

const bannerList = [
  { heading: "Product List Page Banner", endpoint: "product_list" },
  { heading: "Our Process Page Banner", endpoint: "our_process" },
  { heading: "Shyam-G Blog Page Banner", endpoint: "shyamg_blog" },
  { heading: "Events Page Banner", endpoint: "events" },
  { heading: "Contact Us Page Banner", endpoint: "contact_us" },
  { heading: "Investor Relations Page Banner", endpoint: "investor_relations" },
];

export default function Banner() {
  return (
    <div className="p-5 sm:p-[20px] sm:pt-16 bg-[#f5f6fa] min-h-screen">
      <h2 className="text-2xl font-medium text-black mb-6">Welcome Back, Admin!</h2>
      {bannerList.map((b) => (
        <BannerSection key={b.endpoint} heading={b.heading} endpoint={b.endpoint} />
      ))}
    </div>
  );
}
