import { FaCheckCircle } from "react-icons/fa";

type TrustStripProps = {
  items?: string[];
};

export default function TrustStrip({
  items = ["10,000+ customers helped", "24/7 booking support", "No hidden charges"],
}: TrustStripProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
        {items.map((text) => (
          <div key={text} className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <FaCheckCircle className="text-green-600" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

