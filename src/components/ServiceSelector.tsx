
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const services = [
  { 
    value: "disney", 
    label: "Disney+", 
    icon: "🏰",
    color: "from-blue-600 to-purple-600"
  },
  { 
    value: "netflix", 
    label: "Netflix", 
    icon: "🎬",
    color: "from-red-600 to-red-700"
  },
  { 
    value: "spotify", 
    label: "Spotify", 
    icon: "🎵",
    color: "from-green-500 to-green-600"
  },
  { 
    value: "roblox", 
    label: "Roblox", 
    icon: "🎮",
    color: "from-blue-500 to-blue-600"
  },
  { 
    value: "hbomax", 
    label: "HBO Max", 
    icon: "📺",
    color: "from-purple-600 to-purple-700"
  },
  { 
    value: "crunchyroll", 
    label: "Crunchyroll", 
    icon: "🍜",
    color: "from-orange-500 to-orange-600"
  },
  { 
    value: "epicgames", 
    label: "Epic Games", 
    icon: "⚡",
    color: "from-gray-700 to-gray-800"
  },
  { 
    value: "origin", 
    label: "Origin", 
    icon: "🎯",
    color: "from-orange-600 to-red-600"
  },
];

interface ServiceSelectorProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

export const ServiceSelector = ({ selectedService, onServiceChange }: ServiceSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">Select a service</label>
      <Select value={selectedService} onValueChange={onServiceChange}>
        <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white hover:border-green-500/50 transition-all duration-200 shadow-lg">
          <SelectValue placeholder="Select a service" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-600">
          {services.map((service) => (
            <SelectItem 
              key={service.value} 
              value={service.value}
              className="text-white hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{service.icon}</span>
                <span>{service.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
