new Scene({
    ".overflow.in-view .text span": i => ({
        0: {
            transform: {
                translateY: "100%",
            }
        },
        1: {
            transform: {
                translateY: "0%",
            }
        },
        options: {
            delay: i * 0.2,
        }
    }),
}, {
    easing: "ease-in-out",
    selector: true,
    iterationCount: "1",
}).play();