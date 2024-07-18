import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyLoadImageComponent = ({
    src,
    alt,
    placeholder,
}) => {
    const [imageSrc, setImageSrc] = useState(src ? src : placeholder);
    console.log(placeholder, src)
    const handleError = () => {
        setImageSrc(placeholder)
    }

    return (
        <LazyLoadImage
            src={imageSrc}
            alt={alt}
            effect="blur"
            placeholderSrc={placeholder}
            onError={handleError}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: "4px"
            }}
        />
    );
};

export default LazyLoadImageComponent;
