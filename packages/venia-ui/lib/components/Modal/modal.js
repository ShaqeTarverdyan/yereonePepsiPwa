import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { node, object } from 'prop-types';

const Modal = ({ children, container, isMobile }) => {
    const target = useMemo(
        () =>
            container instanceof HTMLElement
                ? container
                : document.getElementById('root'),
        [container]
    );
    const shownOption = isMobile ? createPortal(children, target) : children
    return shownOption;
};

export default Modal;

Modal.propTypes = {
    children: node,
    container: object
};
