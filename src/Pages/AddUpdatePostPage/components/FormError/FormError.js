import styles from "./FormError.module.css"


export const FormError = ({title}) => {
    return (
        <div>
            <p className={styles.error}>{title} is required </p>
        </div>
    )
}