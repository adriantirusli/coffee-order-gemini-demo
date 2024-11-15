import { formatCurrency } from "@/utils/format";

interface ModifierSectionProps {
  title: string;
  options: Array<{
    id: number;
    name: string;
    price: number;
  }>;
  type: "radio" | "checkbox";
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export default function ModifierSection({
  title,
  options,
  type,
  value,
  onChange,
}: ModifierSectionProps) {
  const handleChange = (id: string) => {
    if (type === "radio") {
      onChange(id);
    } else {
      const currentValue = value as string[];
      onChange(
        currentValue.includes(id)
          ? currentValue.filter((item) => item !== id)
          : [...currentValue, id]
      );
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <input
                type={type}
                name={title.toLowerCase().replace(/\s+/g, "-")}
                value={option.id}
                checked={
                  type === "radio"
                    ? value === option.id.toString()
                    : (value as string[]).includes(option.id.toString())
                }
                onChange={() => handleChange(option.id.toString())}
                className="h-4 w-4"
              />
              <span>{option.name}</span>
            </div>
            {option.price > 0 && (
              <span className="text-gray-600">
                +{formatCurrency(option.price)}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
