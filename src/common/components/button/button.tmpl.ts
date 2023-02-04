import styles from './styles.module.css';

export type ButtonProps = {
    value: string,
    onClick?: string,
    variant?: 'blue' | 'ghost' | 'red',
    additionalClassName?: string,
    type?: string
};

export const button = (
    value: ButtonProps['value'] = '',
    onClick: ButtonProps['onClick']  = '',
    variant: ButtonProps['variant']  = 'blue',
    additionalClassName: ButtonProps['additionalClassName']  = '',
    type: ButtonProps['type']  = 'click',
) => {
    return (`
        <button
            className="${styles['button']} ${styles[variant]} ${additionalClassName}"
            type="${type}"
            onClick="${onClick}"
        >
            ${value}
        </button>
    `);
};
