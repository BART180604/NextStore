import React from "react";
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";
import Container from "./Container";

const BrandTrust = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-darkColor" />,
      title: "Free Shipping",
      description: "On all orders over $100",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-darkColor" />,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: <Headphones className="w-8 h-8 text-darkColor" />,
      title: "24/7 Support",
      description: "Dedicated support team",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-darkColor" />,
      title: "Flexible Payment",
      description: "Multiple payment options available",
    },
  ];

  return (
    <section className="bg-zinc-50 py-12 border-y border-zinc-200">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 hover:bg-white rounded-xl transition-colors duration-300"
            >
              <div className="p-3 bg-white rounded-lg shadow-sm">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-darkColor">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BrandTrust;
