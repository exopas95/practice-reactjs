import PropTypes from "prop-types";
import styles from "./Button.module.css";

Button.propTypes = {
    text: PropTypes.string.isRequired,
}

/*
 * css를 적용하는 방법은 크게 세 가지
 * 1. 기존 CSS 적용 방식처럼 style.css 를 선언해서 import하는 방법
 * 2. 태그 안에 style을 정의하는 방법
 * 3. module.css를 만드는 방법
 * 무조건 3번 방법을 쓴다. -> style도 모듈화가 가능하다!!
 */
// css를 적용하는 방법은 
function Button({ text }) {
    return (
        <button className={styles.btn}>
            {text}
        </button>
    )
}

export default Button;