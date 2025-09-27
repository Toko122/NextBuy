import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full z-50">
            <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">

                <div className="max-w-96">
                    <Link
                        to="/"
                        className="text-2xl md:text-3xl font-bold cursor-pointer text-indigo-600"
                    >
                        NexBuy
                    </Link>
                    <p className="mt-6 text-sm text-gray-500">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                        <Link to='https://www.facebook.com/toko.migineishvili.2025/'>
                            <FaFacebook className="text-[20px] text-blue-500" />
                        </Link>
                        <Link to='https://www.linkedin.com/in/toko-migineishvili-a19770370/'>
                            <FaLinkedin className="text-[20px] text-blue-700" />
                        </Link>
                        <Link to='https://github.com/Toko122?tab=repositories'>
                            <FaGithub className="text-[20px] text-gray-700" />
                        </Link>
                    </div>
                </div>

                <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-5">RESOURCES</h2>
                        <ul className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Tutorials</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Community</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-5">COMPANY</h2>
                        <div className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms</a></li>
                        </div>
                    </div>
                </div>

            </div>
            <p className="py-4 text-center text-xs md:text-sm text-gray-500">
                Copyright 2024 © <a href="https://prebuiltui.com">PrebuiltUI</a>. All Right Reserved.
            </p>
        </footer>
    );
};