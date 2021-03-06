
// eslint-disable-next-line no-undef
export const nextFrame = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame;

export const addWindowEvent = (event, handler, options) => {
    if (typeof window === 'undefined') {
        return;
    }

    // eslint-disable-next-line no-undef
    window.addEventListener(event, handler, options);
};

export const removeWindowEvent = (event, handler, options) => {
    if (typeof window === 'undefined') {
        return;
    }

    // eslint-disable-next-line no-undef
    window.removeEventListener(event, handler, options);
};

// eslint-disable-next-line no-undef
export const locationAssign = url => (typeof window === 'undefined' ? null : window.location.assign(url));

export const getWindowSize = () => {
    if (typeof window === 'undefined') {
        return [1000, 1000];
    }

    // eslint-disable-next-line no-undef
    const {innerWidth, innerHeight} = window;

    return [innerWidth, innerHeight];
};

// eslint-disable-next-line no-undef
export const getDevicePixelRatio = () => ((typeof window === 'undefined') ? 1 : window.devicePixelRatio);
