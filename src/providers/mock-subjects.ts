import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "Fundamental concepts of computation, algorithms, and problem-solving using a high-level programming language.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    description:
      "Continuation of single-variable calculus: techniques of integration, infinite series, and polar coordinates.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    code: "PHYS150",
    name: "General Physics",
    department: "Physics",
    description:
      "Introductory physics covering mechanics, energy, oscillations, and waves with real-world applications.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    code: "ECON101",
    name: "Principles of Economics",
    department: "Economics",
    description:
      "Foundations of micro- and macroeconomics: supply and demand, markets, and basic economic indicators.",
    createdAt: new Date().toISOString(),
  },
];
