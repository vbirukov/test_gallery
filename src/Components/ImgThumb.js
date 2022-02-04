import PropTypes from "prop-types";
import './imgThumb.css';

const Thumb = (props) => {

    return(
        <div
            className={`Gallery_imgThumb`}>
            <img alt={props.alt} src={props.src}/>
        </div>
    )
}

Thumb.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

export default Thumb;