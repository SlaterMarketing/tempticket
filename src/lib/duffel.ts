import { Duffel } from "@duffel/api";

export function getDuffel() {
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  if (!token) {
    throw new Error("DUFFEL_ACCESS_TOKEN is not set");
  }
  return new Duffel({ token });
}
