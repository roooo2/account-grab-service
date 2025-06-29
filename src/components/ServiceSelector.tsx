
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const services = [
  { value: "disney", label: "Disney+" },
  { value: "netflix", label: "Netflix" },
  { value: "spotify", label: "Spotify" },
  { value: "roblox", label: "Roblox" },
  { value: "hbomax", label: "HBO Max" },
  { value: "crunchyroll", label: "Crunchyroll" },
  { value: "epicgames", label: "Epic Games" },
  { value: "origin", label: "Origin" },
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
        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
          <SelectValue placeholder="Select a service" />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 border-gray-600">
          {services.map((service) => (
            <SelectItem 
              key={service.value} 
              value={service.value}
              className="text-white hover:bg-gray-600 focus:bg-gray-600"
            >
              {service.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
