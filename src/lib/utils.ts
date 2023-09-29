import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price:number) {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "EUR"
  }).format(price)
}
