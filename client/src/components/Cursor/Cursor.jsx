import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import "./Cursor.css"
 // Ensure to create and import a CSS file for custom cursor styles

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
      

        const onMouseMove = (e) => {
            gsap.to(cursor, {
                duration: 0.2,
                left: e.clientX,
                top: e.clientY,
            });
           
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor "><img src="https://cdn-icons-png.flaticon.com/512/6643/6643371.png" alt="" /></div>
           
        </>
    );
};

export default Cursor;
