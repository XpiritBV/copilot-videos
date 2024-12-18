import React, { useEffect } from 'react';

function PoweredBy() {
    // return an image with the powered by xebia log
    return (
        <a href="https://xebia.com/academy/nl/discipline/github/" target='_blank'>
            <img src="Powered_by_Xebia.svg" className='poweredBy' alt="Powered by Xebia" />
        </a>
    );
}

export default PoweredBy;