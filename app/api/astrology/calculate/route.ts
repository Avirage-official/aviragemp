// app/api/astrology/calculate/route.ts
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/* -------------------------------------------------------------------------- */
/* ZODIAC SIGN CALCULATION                                                    */
/* -------------------------------------------------------------------------- */

interface ZodiacSign {
  sign: string;
  element: string;
  modality: string;
  rulingPlanet: string;
}

const ZODIAC_SIGNS: ZodiacSign[] = [
  { sign: "Capricorn", element: "Earth", modality: "Cardinal", rulingPlanet: "Saturn" },
  { sign: "Aquarius", element: "Air", modality: "Fixed", rulingPlanet: "Uranus" },
  { sign: "Pisces", element: "Water", modality: "Mutable", rulingPlanet: "Neptune" },
  { sign: "Aries", element: "Fire", modality: "Cardinal", rulingPlanet: "Mars" },
  { sign: "Taurus", element: "Earth", modality: "Fixed", rulingPlanet: "Venus" },
  { sign: "Gemini", element: "Air", modality: "Mutable", rulingPlanet: "Mercury" },
  { sign: "Cancer", element: "Water", modality: "Cardinal", rulingPlanet: "Moon" },
  { sign: "Leo", element: "Fire", modality: "Fixed", rulingPlanet: "Sun" },
  { sign: "Virgo", element: "Earth", modality: "Mutable", rulingPlanet: "Mercury" },
  { sign: "Libra", element: "Air", modality: "Cardinal", rulingPlanet: "Venus" },
  { sign: "Scorpio", element: "Water", modality: "Fixed", rulingPlanet: "Pluto" },
  { sign: "Sagittarius", element: "Fire", modality: "Mutable", rulingPlanet: "Jupiter" },
];

// Date boundaries for each sign (month, day)
const ZODIAC_DATES: [number, number][] = [
  [1, 20],   // Aquarius starts
  [2, 19],   // Pisces starts
  [3, 21],   // Aries starts
  [4, 20],   // Taurus starts
  [5, 21],   // Gemini starts
  [6, 21],   // Cancer starts
  [7, 23],   // Leo starts
  [8, 23],   // Virgo starts
  [9, 23],   // Libra starts
  [10, 23],  // Scorpio starts
  [11, 22],  // Sagittarius starts
  [12, 22],  // Capricorn starts
];

function getSunSign(month: number, day: number): ZodiacSign {
  // Find the index based on date
  let signIndex = 0;
  
  for (let i = 0; i < ZODIAC_DATES.length; i++) {
    const [m, d] = ZODIAC_DATES[i];
    if (month > m || (month === m && day >= d)) {
      signIndex = i + 1;
    }
  }
  
  // Wrap around for Capricorn (index 0)
  if (signIndex >= 12) signIndex = 0;
  
  return ZODIAC_SIGNS[signIndex];
}

/* -------------------------------------------------------------------------- */
/* NUMEROLOGY CALCULATIONS                                                    */
/* -------------------------------------------------------------------------- */

// Reduce a number to single digit (or master number 11, 22, 33)
function reduceToSingleDigit(num: number, keepMaster: boolean = true): number {
  while (num > 9) {
    // Keep master numbers
    if (keepMaster && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    
    // Sum the digits
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

// Life Path Number: Sum of all birth date digits
function calculateLifePath(year: number, month: number, day: number): number {
  // Reduce each component first (Pythagorean method)
  const reducedYear = reduceToSingleDigit(year);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedDay = reduceToSingleDigit(day);
  
  // Then sum and reduce
  const total = reducedYear + reducedMonth + reducedDay;
  return reduceToSingleDigit(total);
}

// Birthday Number: Just the day reduced
function calculateBirthdayNumber(day: number): number {
  return reduceToSingleDigit(day, false);
}

// Personal Year Number: Current year + birth month + birth day
function calculatePersonalYear(birthMonth: number, birthDay: number): number {
  const currentYear = new Date().getFullYear();
  const total = reduceToSingleDigit(currentYear) + reduceToSingleDigit(birthMonth) + reduceToSingleDigit(birthDay);
  return reduceToSingleDigit(total);
}

// Destiny Number (Expression): From full name - we'll calculate if name exists
function calculateDestinyNumber(name: string | null): number | null {
  if (!name) return null;
  
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };
  
  const total = name
    .toLowerCase()
    .split("")
    .filter((char) => letterValues[char])
    .reduce((sum, char) => sum + letterValues[char], 0);
  
  return reduceToSingleDigit(total);
}

// Soul Urge Number: From vowels in name
function calculateSoulUrge(name: string | null): number | null {
  if (!name) return null;
  
  const vowelValues: Record<string, number> = {
    a: 1, e: 5, i: 9, o: 6, u: 3,
  };
  
  const total = name
    .toLowerCase()
    .split("")
    .filter((char) => vowelValues[char])
    .reduce((sum, char) => sum + vowelValues[char], 0);
  
  return reduceToSingleDigit(total);
}

// Personality Number: From consonants in name
function calculatePersonalityNumber(name: string | null): number | null {
  if (!name) return null;
  
  const consonantValues: Record<string, number> = {
    b: 2, c: 3, d: 4, f: 6, g: 7, h: 8,
    j: 1, k: 2, l: 3, m: 4, n: 5, p: 7, q: 8, r: 9,
    s: 1, t: 2, v: 4, w: 5, x: 6, y: 7, z: 8,
  };
  
  const total = name
    .toLowerCase()
    .split("")
    .filter((char) => consonantValues[char])
    .reduce((sum, char) => sum + consonantValues[char], 0);
  
  return reduceToSingleDigit(total);
}

// Lucky numbers based on life path
function getLuckyNumbers(lifePath: number): number[] {
  const luckyMap: Record<number, number[]> = {
    1: [1, 10, 19, 28],
    2: [2, 11, 20, 29],
    3: [3, 12, 21, 30],
    4: [4, 13, 22, 31],
    5: [5, 14, 23],
    6: [6, 15, 24],
    7: [7, 16, 25],
    8: [8, 17, 26],
    9: [9, 18, 27],
    11: [11, 29, 38, 47],
    22: [22, 40, 58],
    33: [33, 42, 51],
  };
  return luckyMap[lifePath] || [lifePath];
}

// Lucky colors based on life path
function getLuckyColors(lifePath: number): string[] {
  const colorMap: Record<number, string[]> = {
    1: ["Red", "Orange", "Gold"],
    2: ["White", "Cream", "Green"],
    3: ["Yellow", "Purple", "Pink"],
    4: ["Blue", "Gray", "Green"],
    5: ["Light Gray", "White", "Silver"],
    6: ["Blue", "Pink", "Green"],
    7: ["Violet", "Purple", "Gray"],
    8: ["Black", "Dark Blue", "Brown"],
    9: ["Red", "Pink", "Crimson"],
    11: ["White", "Silver", "Pale Yellow"],
    22: ["Coral", "Rust", "Cream"],
    33: ["Turquoise", "Sky Blue", "Pink"],
  };
  return colorMap[lifePath] || ["White"];
}

/* -------------------------------------------------------------------------- */
/* API ROUTE                                                                  */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  try {
    // Get authenticated user
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      select: {
        id: true,
        name: true,
        birthDate: true,
        birthTime: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.birthDate) {
      return NextResponse.json(
        { error: "Birth date not set. Please complete onboarding." },
        { status: 400 }
      );
    }

    // Extract date components
    const birthDate = new Date(user.birthDate);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1; // JS months are 0-indexed
    const day = birthDate.getDate();

    // Calculate astrology
    const sunSign = getSunSign(month, day);

    // Calculate numerology
    const lifePath = calculateLifePath(year, month, day);
    const birthdayNumber = calculateBirthdayNumber(day);
    const personalYear = calculatePersonalYear(month, day);
    const destinyNumber = calculateDestinyNumber(user.name);
    const soulUrge = calculateSoulUrge(user.name);
    const personalityNumber = calculatePersonalityNumber(user.name);

    // Get lucky numbers and colors
    const luckyNumbers = getLuckyNumbers(lifePath);
    const luckyColors = getLuckyColors(lifePath);

    // Create or update AstrologyProfile
    const astrologyProfile = await prisma.astrologyProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        
        // Astrology
        sunSign: sunSign.sign,
        birthElement: sunSign.element,
        modality: sunSign.modality,
        
        // Planetary ruler (simplified - just sun sign ruler)
        // Moon/rising require birth time + location calculations
        
        // Numerology
        lifePathNumber: lifePath,
        birthDayNumber: birthdayNumber,
        personalYearNumber: personalYear,
        destinyNumber: destinyNumber,
        soulUrgeNumber: soulUrge,
        personalityNumber: personalityNumber,
        
        // Lucky attributes
        luckyNumbers: luckyNumbers,
        luckyColors: luckyColors,
        
        // Store full calculation data for reference
        fullData: {
          calculatedAt: new Date().toISOString(),
          birthDate: birthDate.toISOString(),
          birthTime: user.birthTime,
          astrology: {
            sunSign: sunSign.sign,
            element: sunSign.element,
            modality: sunSign.modality,
            rulingPlanet: sunSign.rulingPlanet,
          },
          numerology: {
            lifePath,
            birthdayNumber,
            personalYear,
            destinyNumber,
            soulUrge,
            personalityNumber,
          },
        },
      },
      update: {
        // Astrology
        sunSign: sunSign.sign,
        birthElement: sunSign.element,
        modality: sunSign.modality,
        
        // Numerology
        lifePathNumber: lifePath,
        birthDayNumber: birthdayNumber,
        personalYearNumber: personalYear,
        destinyNumber: destinyNumber,
        soulUrgeNumber: soulUrge,
        personalityNumber: personalityNumber,
        
        // Lucky attributes
        luckyNumbers: luckyNumbers,
        luckyColors: luckyColors,
        
        // Update full data
        fullData: {
          calculatedAt: new Date().toISOString(),
          birthDate: birthDate.toISOString(),
          birthTime: user.birthTime,
          astrology: {
            sunSign: sunSign.sign,
            element: sunSign.element,
            modality: sunSign.modality,
            rulingPlanet: sunSign.rulingPlanet,
          },
          numerology: {
            lifePath,
            birthdayNumber,
            personalYear,
            destinyNumber,
            soulUrge,
            personalityNumber,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      profile: astrologyProfile,
    });
  } catch (error) {
    console.error("Astrology calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate astrology profile" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch existing profile
export async function GET() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: { astrology: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      profile: user.astrology,
      hasBirthDate: !!user.birthDate,
    });
  } catch (error) {
    console.error("Fetch astrology error:", error);
    return NextResponse.json(
      { error: "Failed to fetch astrology profile" },
      { status: 500 }
    );
  }
}