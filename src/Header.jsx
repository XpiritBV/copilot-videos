import React, { useEffect } from 'react';

function Header() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://plausible.io/js/plausible.js";
    script.setAttribute('data-domain', 'github-copilot.xebia.ms');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

export default Header;