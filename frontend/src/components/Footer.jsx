import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#1a1208" }}
      className="text-white px-8 py-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {/* Logo placeholder - replace src with actual logo */}
              <img
                src="/logo.png"
                alt="The Redbone"
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                style={{ display: "none" }}
                className="flex items-center gap-1"
              >
                <span
                  style={{ color: "#c0392b" }}
                  className="text-lg font-bold tracking-widest uppercase"
                >
                  THE REDBONE
                </span>
              </div>
            </div>
            <p
              style={{ color: "#a89880" }}
              className="text-sm leading-relaxed max-w-xs"
            >
              Premium baked meats, slow-smoked to perfection. Where fire meets
              flavor.
            </p>
          </div>

          {/* Hours Column */}
          <div className="flex flex-col gap-4">
            <h3
              style={{ color: "#e8e0d0" }}
              className="text-lg font-bold flex items-center gap-2"
            >
              <span style={{ color: "#c0392b" }}>
                {/* Clock icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                  />
                </svg>
              </span>
              Hours
            </h3>
            <ul style={{ color: "#a89880" }} className="space-y-2 text-sm">
              <li>Mon - Thu: 11am - 10pm</li>
              <li>Fri - Sat: 11am - 12am</li>
              <li>Sunday: 12pm - 9pm</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <h3
              style={{ color: "#e8e0d0" }}
              className="text-lg font-bold flex items-center gap-2"
            >
              <span style={{ color: "#c0392b" }}>
                {/* Phone icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              Contact
            </h3>
            <ul style={{ color: "#a89880" }} className="space-y-2 text-sm">
              <li>(555) RED-BONE</li>
              <li>info@theredbone.com</li>
            </ul>
          </div>

          {/* Location Column */}
          <div className="flex flex-col gap-4">
            <h3
              style={{ color: "#e8e0d0" }}
              className="text-lg font-bold flex items-center gap-2"
            >
              <span style={{ color: "#c0392b" }}>
                {/* Location pin icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              Location
            </h3>
            <address
              style={{ color: "#a89880" }}
              className="not-italic text-sm space-y-1"
            >
              <p>123 Smokehouse Lane</p>
              <p>Downtown, TX 75001</p>
            </address>

            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                style={{ borderColor: "#3a2e22", backgroundColor: "#2a1f15" }}
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-red-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  style={{ color: "#e8e0d0" }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                style={{ borderColor: "#3a2e22", backgroundColor: "#2a1f15" }}
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-red-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  style={{ color: "#e8e0d0" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{ borderColor: "#3a2e22" }}
          className="border-t mt-10 mb-6"
        />

        {/* Bottom bar */}
        <div className="flex justify-center">
          <p style={{ color: "#6b5e4e" }} className="text-sm flex items-center gap-1">
            © 2024 The Redbone. All rights reserved. Smoked with{" "}
            <span style={{ color: "#c0392b" }} className="text-base">
              ❤
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;