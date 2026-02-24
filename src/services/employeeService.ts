import { apiClient } from "./apiClient";
import type { Employee } from "../types/employee";

type TableApiResponse = {
  TABLE_DATA?: {
    data?: unknown[][];
  };
};

function parseSalary(value: unknown): number {
  if (typeof value !== "string") return 0;

  const cleaned = value.replace(/[$,]/g, "").trim();
  const num = Number(cleaned);

  return Number.isFinite(num) ? num : 0;
}

function deriveAgeFromId(id: string): number {
  const num = Number(id.replace(/\D/g, ""));
  if (!Number.isFinite(num)) return 30;
  return 22 + (num % 35);
}

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await apiClient.post<TableApiResponse>(
      "https://backend.jotish.in/backend_dev/gettabledata.php",
      {
        username: "test",
        password: "123456",
      }
    );

    const rows = response?.data?.TABLE_DATA?.data;

    if (!Array.isArray(rows)) {
      throw new Error("Invalid API response format");
    }

    const employees: Employee[] = [];

    for (const row of rows) {
      if (!Array.isArray(row) || row.length < 6) continue;

      const name = String(row[0] ?? "").trim();
      const city = String(row[2] ?? "").trim();
      const id = String(row[3] ?? "").trim();
      const salary = parseSalary(row[5]);

      if (!name || !id) continue;

      employees.push({
        id,
        name,
        city,
        salary,
        age: deriveAgeFromId(id),
      });
    }

    return employees;
  } catch (error) {
    throw new Error("Failed to fetch employees");
  }
}