import { Gajraj_One, Poppins } from "next/font/google";

export const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const gajrajOne = Gajraj_One({
    variable: "--font-gajrajone",
    subsets: ["latin"],
    weight: ["400"],
});
