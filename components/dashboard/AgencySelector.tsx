"use client";

import * as React from "react";
import { Check, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Agency, AgencyType } from "@/lib/types/dashboard";

interface AgencySelectorProps {
  agencies: Agency[];
  selectedAgency: Agency | null;
  onSelect: (agency: Agency) => void;
  className?: string;
}

const agencyTypeColors: Record<AgencyType, string> = {
  "VR": "bg-blue-500",
  "LGBTQ+": "bg-purple-500",
  "Deaf": "bg-green-500",
  "Multi-service": "bg-amber-500",
};

export function AgencySelector({
  agencies,
  selectedAgency,
  onSelect,
  className,
}: AgencySelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select agency"
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0 opacity-50" />
            {selectedAgency ? (
              <>
                <span className="truncate">{selectedAgency.name}</span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "ml-2 text-white",
                    agencyTypeColors[selectedAgency.type]
                  )}
                >
                  {selectedAgency.type}
                </Badge>
              </>
            ) : (
              "Select agency..."
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search agencies..." />
          <CommandList>
            <CommandEmpty>No agency found.</CommandEmpty>
            <CommandGroup>
              {agencies.map((agency) => (
                <CommandItem
                  key={agency.id}
                  value={agency.id}
                  onSelect={() => {
                    onSelect(agency);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedAgency?.id === agency.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{agency.name}</span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-white text-xs",
                          agencyTypeColors[agency.type]
                        )}
                      >
                        {agency.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {agency.location} • {agency.activeClients} active clients
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
