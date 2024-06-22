import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="pb-2 pt-4 flex flex-col items-center justify-between gap-8 bg-primary w-full m-auto text-background">
            <div className="container max-w-2xl m-auto flex flex-wrap gap-10 justify-around">
                <div className="flex flex-col gap-2">
                    <h4 className="text-md font-bold">Legal</h4>
                    <Link href={'/legal'} className="text-sm">
                        Legal Notice
                    </Link>
                    <Link href={'/privacy'} className="text-sm">
                        Privacy Policy
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text-md font-bold">Web site</h4>
                    <Link href={'/dashboard'} className="text-sm">
                        Dashboard
                    </Link>
                    <Link href={'/price'} className="text-sm">
                        Prices
                    </Link>
                    <Link href={'/contact'} className="text-sm">
                        Contact us
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text-md font-bold">Follow us !</h4>
                    <div className="flex gap-2 justify-center">
                        <Link href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                                />
                            </svg>
                        </Link>
                        <Link href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8" />
                                    <path d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m17.5 6.51l.01-.011" />
                                </g>
                            </svg>
                        </Link>
                        <Link href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
                                <path
                                    fill="currentColor"
                                    d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4M7.65 13.979H5.706V7.723H7.65zm-.984-7.024c-.614 0-1.011-.435-1.011-.973c0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973m8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355c-.537 0-.856.371-.997.728c-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01c1.279 0 2.238.857 2.238 2.699z"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
                <Link href="/" className="text-xl font-bold">
                    LOGO
                </Link>
                <p className="text-sm">© {new Date().getFullYear()} - All rights reserved</p>
            </div>
        </footer>
    );
};
