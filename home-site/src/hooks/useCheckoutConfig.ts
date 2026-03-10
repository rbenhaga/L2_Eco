import { useEffect, useState } from 'react';
import { getCheckoutConfig, type CheckoutConfig } from '../services/api';

const DEFAULT_CHECKOUT_CONFIG: CheckoutConfig = {
    offerKey: 'pass_partiels_s4',
    offerLabel: 'Pass Partiels S4',
    amountTotal: 799,
    amountLabel: '7,99 €',
    currency: 'EUR',
    durationDays: 30,
};

export function useCheckoutConfig() {
    const [config, setConfig] = useState<CheckoutConfig>(DEFAULT_CHECKOUT_CONFIG);

    useEffect(() => {
        let active = true;

        const loadConfig = async () => {
            try {
                const data = await getCheckoutConfig();
                if (active) {
                    setConfig(data);
                }
            } catch {
                // Keep the local fallback config if the backend config is unavailable.
            }
        };

        void loadConfig();

        return () => {
            active = false;
        };
    }, []);

    return config;
}
