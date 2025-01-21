'use client'
import { ArrowDownRight, ArrowUp, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero1 = () => {
    const router = useRouter();
    return (
        <section className="py-32">
            <div className="container">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <Badge variant="outline">
                            Urdu word for "Spreading"
                            <ArrowDownRight className="ml-2 size-4" />
                        </Badge>
                        <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                            Welcome to <span className="text-[#F7AB0A]">Taqseem</span>
                        </h1>
                        <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                            Tqasem was made with the intention to connect donors and volunteers with people in whose lives they can make a <span className="text-[#F7AB0A]/90 ">difference</span>.
                        </p>
                        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                            <Button className="w-full sm:w-auto" onClick={
                                () =>
                                    router.push('/login')
                            }>Login</Button>
                            <Button variant="outline" className="w-full sm:w-auto" onClick={
                                () =>
                                    router.push('/register')
                            }>
                                Sign Up
                                <ArrowUpRight className="ml-2 size-4" />
                            </Button>
                        </div>
                    </div>
                    <img
                        src="/assets/icons/Taqseem.svg"
                        alt="placeholder hero"
                        className="max-h-96 w-full rounded-md object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero1;
