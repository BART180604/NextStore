import { cn } from "@/lib/utils";

interface Props {
    amount: number; 
    className?: string;
}

const PriceFormat = ({amount, className}: Props) => {
    const formattedPrice = amount.toLocaleString("en-US", {
        currency: "USD",
        style: "currency", 
        minimumFractionDigits: 2,
    });

    return <span className={cn("text-sm text-darkColor font-semibold ", className)}>{formattedPrice}</span>
}

export default PriceFormat;