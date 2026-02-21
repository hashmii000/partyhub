import React from "react";
import { Gift, TrendingUp, ShieldCheck } from "lucide-react";

const HeroHighlight = () => {
    return (
        <section className="hidden md:block relative z-20 -mt-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className=" rounded-3xl shadow-2xl p-10 border border-purple-100 overflow-hidden relative">

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                    <div className="grid md:grid-cols-3 gap-8 text-center relative z-10">

                        {/* CARD 1 */}
                        <div className=" bg-white group p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2  backdrop-blur-sm border border-transparent hover:border-purple-200">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600  mb-4">
                                <Gift className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                3 Months FREE Pro Plan
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Join as a Founding Vendor and get full Pro access free for 90 days — no credit card required.
                            </p>
                        </div>

                        {/* CARD 2 */}
                        <div className="bg-white group p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2   backdrop-blur-sm hover:bg-white border border-transparent hover:border-pink-200">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-orange-600  mb-4">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                                Higher Visibility & Lower Commission
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Premium placement, priority search ranking, and reduced commission on confirmed bookings.
                            </p>
                        </div>

                        {/* CARD 3 */}
                        <div className="bg-white group p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2   backdrop-blur-sm hover:bg-white border border-transparent hover:border-blue-200">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600  mb-4">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Lock $24.99 Pricing Before Increase
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                               Secure your Pro pricing today before categories fill and standard pricing applies.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroHighlight;
