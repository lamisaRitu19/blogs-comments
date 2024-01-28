import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white text-center font-medium py-6">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
        </footer>
    );
};

export default Footer;