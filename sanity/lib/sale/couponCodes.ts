export const COUPON_CODES={
    BFRIDAY:"BFRIDAY",
    NEWYEAR:"NEWYEAR",
    SUMMER: "SUMMER",
} as const;

export type CouponCode= keyof typeof COUPON_CODES