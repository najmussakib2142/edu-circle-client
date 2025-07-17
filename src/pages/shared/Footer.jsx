import { Link } from "react-router";
// import { useTheme } from "../../provider/ThemeContext";

import { LuSun, LuMoon, LuFacebook, LuTwitter, LuLinkedin } from "react-icons/lu";

const Footer = () => {
    // const { theme, toggleTheme } = useTheme();

    return (
        <footer className="px-6 backdrop-blur transition-all duration-300 shadow-lg py-12 bg-transparent  border-t border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
            <div className="max-w-7xl pl-10 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* About */}
                <div>
                    <Link to="/" className="text-3xl font-bold text-primary">EduCircle</Link>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        EduCircle is your collaborative online group study platform. Create, share, attempt, and grade assignments with friends in real-time.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="hidden md:block">
                    <h3 className="text-lg  font-semibold mb-3 text-gray-900 dark:text-gray-100">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-primary">Home</Link></li>
                        <li><Link to="/AllGroups" className="hover:text-primary">Assignments</Link></li>
                        <li><Link to="/createGroup" className="hover:text-primary">Create Assignment</Link></li>
                        <li><Link to="/myGroups" className="hover:text-primary">My Attempts</Link></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
                        <li><a href="#features" className="hover:text-primary">Features</a></li>
                        <li><a href="#support" className="hover:text-primary">Support</a></li>
                        <li><a href="mailto:study@educircle.app" className="hover:text-primary">Contact</a></li>
                    </ul>
                </div>

                {/* Theme & Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Customize</h3>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-2 ">
                        <a target="blank" href="https://www.facebook.com/programmingHero/" aria-label="Facebook" className="text-xl hover:text-primary"><LuFacebook /></a>
                        <a target="blank" href="https://x.com/ProgrammingHero" aria-label="Twitter" className="text-xl hover:text-primary"><LuTwitter /></a>
                        <a target="blank" href="https://bd.linkedin.com/company/programminghero" aria-label="LinkedIn" className="text-xl hover:text-primary"><LuLinkedin /></a>
                    </div>
                </div>

            </div>

            {/* Footer Bottom */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-12 border-t border-gray-300 dark:border-gray-700 pt-4">
                © {new Date().getFullYear()} EduCircle — All rights reserved | Built for study purpose only.
            </div>
        </footer>);
};

export default Footer;
