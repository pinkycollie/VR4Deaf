"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Case, CaseStatus, CasePriority } from "@/lib/types/dashboard";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

interface CaseListProps {
  cases: Case[];
  onCaseSelect?: (caseItem: Case) => void;
}

const statusColors: Record<CaseStatus, string> = {
  intake: "bg-blue-500",
  assessment: "bg-purple-500",
  planning: "bg-amber-500",
  services: "bg-cyan-500",
  placement: "bg-green-500",
  closed: "bg-gray-500",
};

const priorityColors: Record<CasePriority, string> = {
  high: "text-red-500",
  medium: "text-amber-500",
  low: "text-green-500",
};

export function CaseList({ cases, onCaseSelect }: CaseListProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<CaseStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = React.useState<CasePriority | "all">("all");
  const [sortField, setSortField] = React.useState<keyof Case>("lastUpdated");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Filter cases
  const filteredCases = React.useMemo(() => {
    return cases.filter((caseItem) => {
      const matchesSearch =
        caseItem.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.counselorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || caseItem.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [cases, searchTerm, statusFilter, priorityFilter]);

  // Sort cases
  const sortedCases = React.useMemo(() => {
    return [...filteredCases].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [filteredCases, sortField, sortDirection]);

  // Paginate cases
  const paginatedCases = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCases.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCases, currentPage]);

  const totalPages = Math.ceil(sortedCases.length / itemsPerPage);

  const handleSort = (field: keyof Case) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Management</CardTitle>
        <CardDescription>
          Showing {sortedCases.length} of {cases.length} cases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by client, counselor, or case ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8"
                aria-label="Search cases"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value as CaseStatus | "all");
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="intake">Intake</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="placement">Placement</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={priorityFilter}
              onValueChange={(value) => {
                setPriorityFilter(value as CasePriority | "all");
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by priority">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("id")}
                      className="h-8 px-2"
                      aria-label="Sort by case ID"
                    >
                      Case ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("clientName")}
                      className="h-8 px-2"
                      aria-label="Sort by client name"
                    >
                      Client
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Counselor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("lastUpdated")}
                      className="h-8 px-2"
                      aria-label="Sort by last updated"
                    >
                      Last Updated
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Accessibility Needs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No cases found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCases.map((caseItem) => (
                    <TableRow
                      key={caseItem.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => onCaseSelect?.(caseItem)}
                    >
                      <TableCell className="font-mono text-sm">{caseItem.id}</TableCell>
                      <TableCell className="font-medium">{caseItem.clientName}</TableCell>
                      <TableCell>{caseItem.counselorName}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[caseItem.status]}>
                          {caseItem.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={priorityColors[caseItem.priority]}>
                          {caseItem.priority.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        {format(new Date(caseItem.lastUpdated), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {caseItem.accessibilityNeeds.slice(0, 2).map((need, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {need}
                            </Badge>
                          ))}
                          {caseItem.accessibilityNeeds.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{caseItem.accessibilityNeeds.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {paginatedCases.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(currentPage * itemsPerPage, sortedCases.length)} of {sortedCases.length}{" "}
              results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
