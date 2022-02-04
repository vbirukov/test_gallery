import React, {Component, useRef} from 'react';
import PropTypes from "prop-types";
import './Gallery.css';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'React',
            modalImgSrc: '',
            modalVisible: false,
            modalTitle: '',
            items: props.items.splice(0, 50),
            cursor: 50
        };
    }

    observerRef = React.createRef(null)

    observer = new IntersectionObserver(this.addItems.bind(this), {
        root: null,
        rootMargin: '50px',
        threshold: 1
    })

    addItems() {
        this.setState({
            items: [...this.state.items, ...this.props.items.splice(this.state.cursor, 50)],
            cursor: this.state.cursor + 50
        });
    }

    showModal(img) {
        this.setState({
            modalTitle: img.title,
            modalImgSrc: img.url,
            modalVisible: true
        });
    }

    componentDidMount() {
        if (this.observerRef.current) {
            this.observer.observe(this.observerRef.current);
        }
    }

    render() {
        if (this.props.items !== undefined) {
            return(<div className='Gallery'>
                {this.state.items.map(image => (
                    <img onClick={this.showModal.bind(this, image)} src={image.thumbnailUrl} alt={image.title} key={image.id.toString()}/>))}
                <div className='Gallery-intersector' ref={this.observerRef}></div>
                <div
                    onClick={() => {
                        this.setState({modalVisible: false});
                    }}
                    className={`Gallery__imageModal_overlay flex-center-center ${this.state.modalVisible ? 'Gallery__imageModal_overlay_visible ' : ''}`}>
                    <div className={`Gallery__imageModal_dialog flex-center-center`}>
                        <img src={this.state.modalImgSrc} alt={this.state.modalTitle} className={`Gallery__imageModal_dialog_image`}/>
                    </div>
                </div>
            </div>)
        } else  {
            return('');
        }
    }
}

Gallery.propTypes = {
    items: PropTypes.array,
    rowWidth: PropTypes.number
};

export default Gallery;