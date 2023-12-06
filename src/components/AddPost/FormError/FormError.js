import styles from "./FormError.module.css"


const FormError = () => {
    return (
        <div>
            <p className={styles.error}>All fields are required </p>
        </div>
    )
}

export default FormError
