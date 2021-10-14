import React from 'react';

import { Logo } from 'src/modules/core/components';

export const Header: React.FC = () => {
    return (
        <div
            style={{ backgroundColor: '#20232a', textAlign: 'center' }}
            data-testid="container"
        >
            <Logo />
        </div>
    );
};
