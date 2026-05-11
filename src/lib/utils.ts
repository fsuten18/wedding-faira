import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//formatted date to distance date-fns
export function formatDate(date: Date) {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function isSpamMessage(message: string): boolean {
  // 1. Harus lebih dari satu kata
  if (!message.trim().includes(" ")) return true;

  // 2. Karakter unik sangat sedikit (misal < 5 untuk pesan > 10 karakter)
  const uniqueChars = new Set(message.replace(/\s/g, "").split(""));
  if (message.length > 10 && uniqueChars.size < 5) return true;

  // 3. Ada kata lebih dari 20 karakter tanpa spasi
  if (message.split(" ").some((word) => word.length > 20)) return true;

  // 4. Satu karakter diulang lebih dari 10 kali berturut-turut
  if (/(.)\1{9,}/.test(message)) return true;

  return false;
}

export const getMaskedNumber = (number: string, lastNumber: number) => {
  const cleanNumber = number.replace(/\D/g, "");

  if (cleanNumber.length <= 4) {
    return cleanNumber.replace(/(.{4})/g, "$1 ");
  }

  const lastFour = cleanNumber.slice(-lastNumber);
  const maskedPart = cleanNumber.slice(0, -lastNumber).replace(/\d/g, "*");

  const fullmasked = maskedPart + lastFour;

  let formattedNumber = "";

  for (let i = 0; i < fullmasked.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedNumber += " ";
    }
    formattedNumber += fullmasked[i];
  }

  return formattedNumber;
};
